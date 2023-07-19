import fs from 'fs';
import path from 'path';
import xmlJS from 'xml-js';
import { HexReader } from 'r_lib';
import { FillObject, RemoveSpace, SignExtend } from '../utils.js';
let xml_converter_shits = [];
// Octane 2 Model Parser [Update 1] by iseeeva //
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
        if (Node.Type._text === 'SubGeometryLit' || Node.Type._text === 'SubGeometry') {
            const Model = {
                ID: Number(RemoveSpace(Node._text)),
                Type: Node.Type._text,
                Name: Node.NodeName._text,
                References: {
                    Parent: [],
                    Material: Number(Node.MaterialReference._text),
                    Vertex: [],
                    Index: Number(Node.IndexStreamReference._text),
                },
            };
            if (Node.VertexStreamReferences.entry != null) {
                xml_converter_shits = Array.isArray(Node.VertexStreamReferences.entry) ? Node.VertexStreamReferences.entry : [Node.VertexStreamReferences.entry];
                xml_converter_shits.forEach((Reference) => { Model.References.Vertex.push(Number(Reference._text)); });
            }
            else {
                return;
            }
            if (Node.ParentNodeReferences.entry != null) {
                xml_converter_shits = Array.isArray(Node.ParentNodeReferences.entry) ? Node.ParentNodeReferences.entry : [Node.ParentNodeReferences.entry];
                xml_converter_shits.forEach((Reference) => { Model.References.Parent.push(Number(Reference._text)); });
            }
            else {
                Model.References.Parent.push(-1);
            }
            // console.log('\n', Model.ID, Model.Type, Model.Name, Model.References.Parent, Model.References.Material, Model.References.Vertex, Model.References.Index)
            //#region Parse VertexStream
            Model.References.Vertex.forEach((Reference) => {
                oct.root_node.VertexStreamPool.VertexStream.forEach((VertexStream) => {
                    if (Number(RemoveSpace(VertexStream._text)) === Reference) {
                        const Vertex = {
                            ID: Number(RemoveSpace(VertexStream._text)),
                            Length: Number(VertexStream.Length._text),
                            Width: Number(VertexStream.Width._text),
                            EWidth: Number(VertexStream.ExtraStride._text),
                            Buffer: {
                                ID: Number(VertexStream.VertexBufferReference._text),
                                FileName: '',
                                FilePath: '',
                                Offset: Number(VertexStream.VertexBufferOffset._text),
                            },
                        };
                        oct.root_node.VertexBufferPool.VertexBuffer.forEach((VertexBuffer) => {
                            if (Number(RemoveSpace(VertexBuffer._text)) === Vertex.Buffer.ID) {
                                Vertex.Buffer.FilePath = path.join(WorkPath, VertexBuffer.FileName._text);
                                Vertex.Buffer.FileName = VertexBuffer.FileName._text;
                                FillObject(Database, [Vertex.Buffer.FileName]);
                            }
                        });
                        if (VertexStream.Elements.Element != null)
                            xml_converter_shits = Array.isArray(VertexStream.Elements.Element) ? VertexStream.Elements.Element : [VertexStream.Elements.Element];
                        else
                            return;
                        xml_converter_shits.forEach((Elements) => {
                            const Element = {
                                ID: Number(Elements._text),
                                Name: Elements.Name._text,
                                Offset: Number(Elements.Offset._text),
                                TypeID: Number(Elements.Type._text),
                                Array: [],
                            };
                            const Stream = new HexReader(Vertex.Buffer.FilePath);
                            Stream.setOffset(0, Vertex.Buffer.Offset + Element.Offset);
                            for (let i = 0; i < Vertex.Length; i++) {
                                switch (Element.TypeID) {
                                    case 1: // Uv1/PC
                                        Element.Array.push([
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                        ]);
                                        Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 8));
                                        break;
                                    case 2: // Position/PC_PS3
                                        Element.Array.push([
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                        ]);
                                        Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 12));
                                        break;
                                    case 3: // Normal/PC
                                        Element.Array.push([
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                            Stream.Read(0, 4, { ...Config.HexReader, readAs: 'float32' }),
                                        ]);
                                        Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 16));
                                        break;
                                    case 24: // BoneIndices/PC_PS3
                                        Element.Array.push([
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }),
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }),
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }),
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }),
                                        ]);
                                        Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 4));
                                        break;
                                    case 25: // BlendWeights/PC_PS3
                                        Element.Array.push([
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }) / 255,
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }) / 255,
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }) / 255,
                                            Stream.Read(0, 1, { ...Config.HexReader, readAs: 'integer' }) / 255,
                                        ]);
                                        Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 4));
                                        break;
                                    case 39:
                                        {
                                            const Combined = Stream.Read(0, 4, { ...Config.HexReader, readAs: 'integer' });
                                            Element.Array.push([
                                                SignExtend(((Combined) & 0x7FF), 32, 11) / 1024.0,
                                                SignExtend(((Combined >> 11) & 0x7FF), 32, 11) / 1024.0,
                                                SignExtend(((Combined >> 22) & 0x3FF), 32, 10) / 512.0,
                                            ]);
                                            Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 4));
                                        }
                                        break;
                                    case 44: // Uv1/PS3
                                        Element.Array.push([
                                            Stream.Read(0, 2, { ...Config.HexReader, readAs: 'float16' }),
                                            Stream.Read(0, 2, { ...Config.HexReader, readAs: 'float16' }),
                                        ]);
                                        Stream.setOffset(0, Stream.getOffset(0) + ((Vertex.EWidth + Vertex.Width) - 4));
                                        break;
                                    default:
                                        throw new Error(`\n ${Element.TypeID} is a unknown type of data for VertexStream, please contant the iseeeva for this.`);
                                }
                            }
                            Model.References.Parent.forEach((Parent) => {
                                FillObject(Database, [Vertex.Buffer.FileName, Parent, Model.Name, Vertex.ID]);
                                Database[Vertex.Buffer.FileName][Parent][Model.Name][Vertex.ID][Element.Name] = Element.Array;
                            });
                            // console.log('\n', `${Model.Name}/${Vertex.ID}/${Element.Name}`, Vertex.Buffer.FileName, '\n', Element.Array[Element.Array.length - 1])
                        });
                    }
                });
            });
            //#endregion
            //#region Parse IndexStream
            oct.root_node.IndexStreamPool.IndexStream.forEach((IndexStream) => {
                if (Number(RemoveSpace(IndexStream._text)) !== Model.References.Index)
                    return;
                const Index = {
                    ID: Number(RemoveSpace(IndexStream._text)),
                    Length: Number(IndexStream.Length._text),
                    Width: 0,
                    Buffer: {
                        ID: Number(IndexStream.IndexBufferReference._text),
                        FileName: '',
                        FilePath: '',
                        Primitive: IndexStream.IndexStreamPrimitive._text,
                        Offset: Number(IndexStream.IndexBufferOffset._text),
                    },
                };
                const Element = {
                    Array: [],
                };
                oct.root_node.IndexBufferPool.IndexBuffer.forEach((IndexBuffer) => {
                    if (Number(RemoveSpace(IndexBuffer._text)) !== Index.Buffer.ID)
                        return;
                    Index.Buffer.FilePath = path.join(WorkPath, IndexBuffer.FileName._text);
                    Index.Buffer.FileName = IndexBuffer.FileName._text;
                    Index.Width = Number(IndexBuffer.Width._text);
                    FillObject(Database, [Index.Buffer.FileName]);
                });
                const Stream = new HexReader(Index.Buffer.FilePath);
                Stream.setOffset(0, Index.Buffer.Offset);
                for (let i = 0; i < Index.Length; i++) {
                    switch (Index.Width) {
                        case 2:
                            Element.Array.push([
                                Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                                Stream.Read(0, 2, { ...Config.HexReader, readAs: 'integer' }),
                            ]);
                            Index.Length -= 2;
                            break;
                        default:
                            throw new Error(`\n ${Index.Width} is a unknown type of data for IndexStream, please contant the iseeeva for this.`);
                    }
                }
                Model.References.Parent.forEach((Parent) => {
                    FillObject(Database, [Index.Buffer.FileName, Parent, Model.Name, Index.ID]);
                    Database[Index.Buffer.FileName][Parent][Model.Name][Index.ID][Index.Buffer.Primitive] = Element.Array;
                });
                // console.log('\n', `${Model.Name}/${Index.ID}/${Index.Buffer.Primitive}`, Index.Buffer.FileName, '\n', Element.Array[Element.Array.length - 1])
            });
            //#endregion
        }
    });
    return Database;
}
