import fs from 'fs';
import path from 'path';
import xmlJS from 'xml-js';
import { HexReader } from 'r_lib';
import { FillObject, XMLArray } from '../../utils.js';
import { PS3, PS4 } from './Table.js';
// Octane 3 Model Parser [Update 1] by iseeeva //
/**
 * Octane 3: Model Parser
 **/
export default function (File, Options = { isLittle: false }) {
    /** Database of Parsed Model */
    const Database = {};
    /** General Config Presets */
    const Config = {
        HexReader: { addPos: true, isLittle: Options.isLittle },
    };
    /** Inputs */
    const Input = {
        File,
        Path: path.dirname(File),
    };
    /** XML File */
    const oct = xmlJS.xml2js(fs.readFileSync(Input.File, 'utf-8'), { compact: true });
    oct.root_node.SceneTreeNodePool.Node.forEach((Node) => {
        if (Node.Type._text === 'Geometry') {
            const Model = {
                ID: Number((Node._text).trim()),
                Type: Node.Type._text,
                Name: Node.NodeName._text,
                Scale: {
                    X: parseFloat(Node.UnitScale.entry[0]._text),
                    Y: parseFloat(Node.UnitScale.entry[1]._text),
                    Z: parseFloat(Node.UnitScale.entry[2]._text),
                },
                References: {
                    Parent: [],
                },
            };
            XMLArray(Node.ParentNodeReferences.entry).forEach((Reference) => {
                Model.References.Parent.push(Number(Reference._text));
            });
            if (Node.Primitives.Primitive != null) {
                XMLArray(Node.Primitives.Primitive).forEach((Primivite, Index) => {
                    const Data = {
                        ID: Number((Primivite._text).trim()),
                        Name: `${Primivite.MaterialName._text}_${Model.ID}_${Index}`,
                        Vertex: {
                            Count: Number(Primivite.Vdata.entry[0]._text),
                            Length: Number(Primivite.Vdata.entry[1]._text),
                            Array: [],
                        },
                        Index: {
                            Count: Primivite.Idata.entry.length / 4,
                            Array: [],
                        },
                    };
                    //#region Parse VDATA
                    for (let i = 0, v = 1; i < Data.Vertex.Count; i++) {
                        Data.Vertex.Array.push({
                            Filename: XMLArray(oct.root_node.VertexBufferPool.VertexBuffer)[Number(Primivite.Vdata.entry[v += 1]._text)].FileName._text,
                            Offset: Number(Primivite.Vdata.entry[v += 1]._text),
                            Width: Options.Platform === 'PS3' ? Number(Primivite.Vdata.entry[v += 1]._text) : undefined,
                            Type: Number(Primivite.Vdata.entry[v += 1]._text),
                            Object: { Uv1: [], Position: [], BoneIndices: [], BlendWeights: [], Normal: [] },
                        });
                    }
                    Data.Vertex.Array.forEach((Element) => {
                        const Stream = new HexReader(path.join(Input.Path, Element.Filename));
                        Stream.setOffset(0, Element.Offset);
                        for (let i = 0; i < Data.Vertex.Length; i++) {
                            let Table;
                            switch (Options.Platform) {
                                case 'PS3':
                                    Table = PS3(Element.Type, { Scale: Model.Scale }, { Buffer: Stream, Options: Config.HexReader });
                                    break;
                                case 'PS4':
                                    Table = PS4(Element.Type, { Scale: Model.Scale }, { Buffer: Stream, Options: Config.HexReader });
                                    break;
                                default:
                                    throw new Error(`${Options.Platform} is a invalid platform for OCT3`);
                            }
                            for (const Type in Table.Data) {
                                Element.Object[Type].push(Table.Data[Type]);
                                Model.References.Parent.forEach((Parent) => {
                                    FillObject(Database, [Element.Filename, String(Parent), Model.Name, Data.Name]);
                                    Database[Element.Filename][Parent][Model.Name][Data.Name][Type] = Element.Object[Type];
                                });
                            }
                            Stream.setOffset(0, Stream.getOffset(0) + Table.Length);
                        }
                    });
                    //#endregion
                    //#region Parse IDATA
                    for (let i = 0, v = -1; i < Data.Index.Count; i++) {
                        Data.Index.Array.push({
                            Filename: XMLArray(oct.root_node.IndexBufferPool.IndexBuffer)[Number(Primivite.Idata.entry[v += 1]._text)].FileName._text,
                            Offset: Number(Primivite.Idata.entry[v += 1]._text),
                            Width: Number(Primivite.Idata.entry[v += 1]._text),
                            Length: Number(Primivite.Idata.entry[v += 1]._text),
                            Object: { TRIANGLES: [] },
                        });
                    }
                    Data.Index.Array.forEach((Element) => {
                        const Stream = new HexReader(path.join(Input.Path, Element.Filename));
                        Stream.setOffset(0, Element.Offset);
                        for (let i = 0; i < Element.Length; i += 3) {
                            switch (Element.Width) {
                                case 0:
                                    Element.Object.TRIANGLES.push([
                                        Stream.read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                        Stream.read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                        Stream.read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                    ]);
                                    break;
                                default:
                                    throw new Error(`\n ${Element.Width} is a unknown type of data for IndexStream, please contact the iseeeva for this.`);
                            }
                        }
                        for (const Type in Element.Object) {
                            Model.References.Parent.forEach((Parent) => {
                                if (Element.Object[Type].length > 0) {
                                    FillObject(Database, [Element.Filename, String(Parent), Model.Name, Data.Name]);
                                    Database[Element.Filename][Parent][Model.Name][Data.Name][Type] = Element.Object[Type];
                                }
                            });
                        }
                    });
                    //#endregion
                });
            }
        }
    });
    return Database;
}
