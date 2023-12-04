import { Sign } from '../../../utils.js';
/** Data Table for Octane 3 - Default */
export default function Default(Type, Info, Stream) {
    switch (Type) {
        case 1:
            return {
                Data: {
                    Uv1: [
                        Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                        Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                    ],
                },
                Length: 0,
            };
        case 3:
            return {
                Data: {
                    Position: [
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.X / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Y / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Z / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF)), // w?
                    ],
                    BoneIndices: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    ],
                    BlendWeights: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    ],
                },
                Length: 0,
            };
        case 5:
            return {
                Data: {
                    Position: [
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.X / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Y / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Z / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF)), // w?
                    ],
                    BoneIndices: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    ],
                    BlendWeights: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    ],
                    Normal: [
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.X / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Y / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Z / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF)), // w?
                    ],
                },
                Length: 8, // zero-filled
            };
        case 8:
            return {
                Data: {
                    BoneIndices: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    ],
                    BlendWeights: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    ],
                },
                Length: 0,
            };
        case 12:
            return {
                Data: {
                    Position: [
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.X / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Y / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Z / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF)), // w?
                    ],
                    Uv1: [
                        Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                        Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                    ],
                },
                Length: 0,
            };
        case 16:
            return {
                Data: {
                    BoneIndices: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    ],
                    BlendWeights: [
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                        Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    ],
                    Normal: [
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.X / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Y / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF) * Info.Scale.Z / 0x7E),
                        ((Sign.Short(Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'integer' })) / 0xFF)), // w?
                    ],
                },
                Length: 0,
            };
        default:
            throw new Error(`\n ${Type} is a unknown type of data, please contact the iseeeva for this.`);
    }
}
