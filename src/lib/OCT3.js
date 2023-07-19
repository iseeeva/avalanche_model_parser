import fs from 'fs';
import path from 'path';
import xmlJS from 'xml-js';
import { HexReader } from 'r_lib';
import { FillObject, RemoveSpace, SignShort } from '../utils.js';
let xml_converter_shits = [];
// Octane 3 Model Parser [Update 1] by iseeeva //
/**
 * OCT(XML) Model Parser
 **/
export default function Parser(OctFileName, Options = { swap_endian: false }) {
    /** Database of Parsed Model */
    const Database = {};
    const Config = {
        HexReader: { add_pos: true, ...Options },
    };
    /** OctFileName's path */
    const WorkPath = path.dirname(OctFileName);
    /**
     * XML File
     **/
    const oct = xmlJS.xml2js(fs.readFileSync(OctFileName, 'utf-8'), { compact: true });
    oct.root_node.SceneTreeNodePool.Node.forEach((Node) => {
        if (Node.Type._text === 'Geometry') {
            const Model = {
                ID: Number(RemoveSpace(Node._text)),
                Type: Node.Type._text,
                Name: Node.NodeName._text,
                References: {
                    Parent: [],
                },
            };
            if (Node.ParentNodeReferences.entry != null) {
                xml_converter_shits = Array.isArray(Node.ParentNodeReferences.entry) ? Node.ParentNodeReferences.entry : [Node.ParentNodeReferences.entry];
                xml_converter_shits.forEach((Reference) => { Model.References.Parent.push(Number(Reference._text)); });
            }
            else {
                Model.References.Parent.push(-1);
            }
            if (Node.Primitives.Primitive != null) {
                xml_converter_shits = Array.isArray(Node.Primitives.Primitive) ? Node.Primitives.Primitive : [Node.Primitives.Primitive];
                xml_converter_shits.forEach((Primivite, PIndex) => {
                    const DATA = {
                        ID: Number(RemoveSpace(Primivite._text)),
                        MaterialName: `${Primivite.MaterialName._text}_${Model.ID}_${PIndex}`,
                        VERTEX: {
                            StreamCount: Number(Primivite.Vdata.entry[0]._text),
                            Length: Number(Primivite.Vdata.entry[1]._text),
                            Array: [],
                        },
                        INDEX: {
                            Stream: oct.root_node.IndexBufferPool.IndexBuffer[Number(Primivite.Idata.entry[0]._text)].FileName._text,
                            Offset: Number(Primivite.Idata.entry[1]._text),
                            Width: Number(Primivite.Idata.entry[2]._text),
                            Length: Number(Primivite.Idata.entry[3]._text),
                        },
                    };
                    for (let i = 0, v = 1; i < DATA.VERTEX.StreamCount; i++) {
                        DATA.VERTEX.Array.push({
                            Stream: oct.root_node.VertexBufferPool.VertexBuffer[Number(Primivite.Vdata.entry[v += 1]._text)].FileName._text,
                            Offset: Number(Primivite.Vdata.entry[v += 1]._text),
                            Width: Number(Primivite.Vdata.entry[v += 1]._text),
                            Type: Number(Primivite.Vdata.entry[v += 1]._text),
                        });
                        FillObject(Database, [DATA.VERTEX.Array[DATA.VERTEX.Array.length - 1].Stream]);
                    }
                    //#region Parse VDATA
                    DATA.VERTEX.Array.forEach((Element) => {
                        const Temporary = { Uv1: [], Position: [] };
                        const Stream = new HexReader(path.join(WorkPath, Element.Stream));
                        Stream.setOffset(0, Element.Offset);
                        for (let i = 0; i < DATA.VERTEX.Length; i++) {
                            switch (Element.Type) {
                                case 1:
                                    Temporary.Uv1.push([
                                        Stream.Read(0, 2, { ...Config.HexReader, readAs: 'float16' }),
                                        Stream.Read(0, 2, { ...Config.HexReader, readAs: 'float16' }),
                                    ]);
                                    break;
                                case 3:
                                    Temporary.Position.push([
                                        SignShort(Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' })) / 0xFF,
                                        SignShort(Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' })) / 0xFF,
                                        SignShort(Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' })) / 0xFF,
                                    ]);
                                    Stream.Read(0, 10, { ...Config.HexReader }); // UNKNOWN
                                    break;
                                case 5:
                                    Temporary.Position.push([
                                        SignShort(Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' })) / 0xFF,
                                        SignShort(Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' })) / 0xFF,
                                        SignShort(Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' })) / 0xFF,
                                    ]);
                                    Stream.Read(0, 26, { ...Config.HexReader }); // UNKNOWN
                                    break;
                                default:
                                    throw new Error(`\n ${Element.Type} is a unknown type of data for VertexStream, please contant the iseeeva for this.`);
                            }
                        }
                        for (const Type in Temporary) {
                            Model.References.Parent.forEach((Parent) => {
                                FillObject(Database, [Element.Stream, Parent, Model.Name, DATA.MaterialName]);
                                if (Temporary[Type].length > 0)
                                    Database[Element.Stream][Parent][Model.Name][DATA.MaterialName][Type] = Temporary[Type];
                            });
                        }
                    });
                    (() => {
                        const Temporary = { TRIANGLES: [] };
                        const Stream = new HexReader(path.join(WorkPath, DATA.INDEX.Stream));
                        Stream.setOffset(0, DATA.INDEX.Offset);
                        for (let i = 0; i < (DATA.INDEX.Length); i++) {
                            switch (DATA.INDEX.Width) {
                                case 0:
                                    Temporary.TRIANGLES.push([
                                        Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                        Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                        Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                    ]);
                                    DATA.INDEX.Length -= 2;
                                    break;
                                default:
                                    throw new Error(`\n ${DATA.INDEX.Width} is a unknown type of data for IndexStream, please contant the iseeeva for this.`);
                            }
                        }
                        for (const Type in Temporary) {
                            Model.References.Parent.forEach((Parent) => {
                                FillObject(Database, [DATA.INDEX.Stream, Parent, Model.Name, DATA.MaterialName]);
                                if (Temporary[Type].length > 0)
                                    Database[DATA.INDEX.Stream][Parent][Model.Name][DATA.MaterialName][Type] = Temporary[Type];
                            });
                        }
                    })();
                    //#endregion
                });
            }
        }
    });
    return Database;
}
