import fs from 'fs';
import path from 'path';
import xmlJS from 'xml-js';
import { HexReader } from 'r_lib';
import { FillObject, XMLArray } from '../../utils.js';
import { PC, PS3, XBOX } from './Table.js';
// Octane 2 Model Parser [Update 1] by iseeeva //
/**
 * Octane 2: Model Parser
 **/
export default function (File, Options = { isLittle: true }) {
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
    /** XML File **/
    const oct = xmlJS.xml2js(fs.readFileSync(Input.File, 'utf-8'), { compact: true });
    oct.root_node.SceneTreeNodePool.Node.forEach((Node) => {
        if (Node.Type._text === 'SubGeometryLit' || Node.Type._text === 'SubGeometry') {
            const Model = {
                ID: Number((Node._text).trim()),
                Type: Node.Type._text,
                Name: Node.NodeName._text,
                References: {
                    Parent: [],
                    Vertex: [],
                    Index: Number(Node.IndexStreamReference._text),
                },
            };
            XMLArray(Node.VertexStreamReferences.entry).forEach((Reference) => {
                Model.References.Vertex.push(Number(Reference._text));
            });
            XMLArray(Node.ParentNodeReferences.entry).forEach((Reference) => {
                Model.References.Parent.push(Number(Reference._text));
            });
            //#region Parse VertexStream
            Model.References.Vertex.forEach((Reference) => {
                oct.root_node.VertexStreamPool.VertexStream.forEach((VertexStream) => {
                    if (Number((VertexStream._text).trim()) !== Reference
                        || VertexStream.Elements.Element == null)
                        return;
                    const Vertex = {
                        ID: Number((VertexStream._text).trim()),
                        Length: Number(VertexStream.Length._text),
                        Width: {
                            Original: Number(VertexStream.Width._text),
                            Extra: Number(VertexStream.ExtraStride._text), // zero filled width
                        },
                        Buffer: {
                            ID: Number(VertexStream.VertexBufferReference._text),
                            Offset: Number(VertexStream.VertexBufferOffset._text),
                            Filename: '',
                        },
                    };
                    for (const VertexBuffer of XMLArray(oct.root_node.VertexBufferPool.VertexBuffer)) {
                        if (Number((VertexBuffer._text).trim()) === Vertex.Buffer.ID) {
                            Vertex.Buffer.Filename = VertexBuffer.FileName._text;
                            break;
                        }
                    }
                    XMLArray(VertexStream.Elements.Element).forEach((Elements) => {
                        const Element = {
                            ID: Number(Elements._text),
                            Name: Elements.Name._text,
                            Offset: Number(Elements.Offset._text),
                            Type: Number(Elements.Type._text),
                            Array: [],
                        };
                        const Stream = new HexReader(path.join(Input.Path, Vertex.Buffer.Filename));
                        Stream.setOffset(0, Vertex.Buffer.Offset + Element.Offset);
                        for (let i = 0; i < Vertex.Length; i++) {
                            let Table;
                            switch (Options.Platform) {
                                case 'PC':
                                    Table = PC(Element.Type, { Buffer: Stream, Options: Config.HexReader });
                                    break;
                                case 'PS3':
                                    Table = PS3(Element.Type, { Buffer: Stream, Options: Config.HexReader });
                                    break;
                                case 'XBOX':
                                    Table = XBOX(Element.Type, { Buffer: Stream, Options: Config.HexReader });
                                    break;
                                default:
                                    throw new Error(`${Options.Platform} is a invalid platform for OCT2`);
                            }
                            Element.Array.push(Table.Data);
                            Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.Width.Original + Vertex.Width.Extra) - Table.Length));
                        }
                        Model.References.Parent.forEach((Parent) => {
                            FillObject(Database, [Vertex.Buffer.Filename, String(Parent), Model.Name, String(Vertex.ID)]);
                            Database[Vertex.Buffer.Filename][Parent][Model.Name][Vertex.ID][Element.Name] = Element.Array;
                        });
                    });
                });
            });
            //#endregion
            //#region Parse IndexStream
            oct.root_node.IndexStreamPool.IndexStream.forEach((IndexStream) => {
                if (Number((IndexStream._text).trim()) !== Model.References.Index)
                    return;
                const Index = {
                    ID: Number((IndexStream._text).trim()),
                    Length: Number(IndexStream.Length._text),
                    Width: 0,
                    Buffer: {
                        ID: Number(IndexStream.IndexBufferReference._text),
                        Primitive: IndexStream.IndexStreamPrimitive._text,
                        Offset: Number(IndexStream.IndexBufferOffset._text),
                        Filename: '',
                    },
                };
                for (const IndexBuffer of XMLArray(oct.root_node.IndexBufferPool.IndexBuffer)) {
                    if (Number((IndexBuffer._text).trim()) === Index.Buffer.ID) {
                        Index.Buffer.Filename = IndexBuffer.FileName._text;
                        Index.Width = Number(IndexBuffer.Width._text);
                        break;
                    }
                }
                const Element = {
                    Array: [],
                };
                const Stream = new HexReader(path.join(Input.Path, Index.Buffer.Filename));
                Stream.setOffset(0, Index.Buffer.Offset);
                for (let i = 0; i < Index.Length; i += 3) {
                    switch (Index.Width) {
                        case 2:
                            Element.Array.push([
                                Stream.read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                Stream.read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                Stream.read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                            ]);
                            break;
                        default:
                            throw new Error(`\n ${Index.Width} is a unknown type of data for IndexStream, please contact the iseeeva for this.`);
                    }
                }
                Model.References.Parent.forEach((Parent) => {
                    FillObject(Database, [Index.Buffer.Filename, String(Parent), Model.Name, String(Index.ID)]);
                    Database[Index.Buffer.Filename][Parent][Model.Name][Index.ID][Index.Buffer.Primitive] = Element.Array;
                });
            });
            //#endregion
        }
    });
    return Database;
}
