import { Sign } from '../../../utils.js';
/** Data Table for Octane 2 - Default */
export default function Default(Type, Stream) {
    switch (Type) {
        case 1: // Uv1 [PC]
            return {
                Data: [
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                ],
                Length: 8,
            };
        case 2: // Position [PC,PS3]
            return {
                Data: [
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                ],
                Length: 12,
            };
        case 3: // Normal [PC]
            return {
                Data: [
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                    Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'float32' }),
                ],
                Length: 16,
            };
        case 24: // BoneIndices [PC,PS3]
            return {
                Data: [
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }),
                ],
                Length: 4,
            };
        case 25: // BlendWeights [PC,PS3]
            return {
                Data: [
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                    Stream.Buffer.read(0, 1, { ...Stream.Options, readAs: 'integer' }) / 255,
                ],
                Length: 4,
            };
        case 31: { // Normal [XBOX]
            const Combined = Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'integer' });
            return {
                Data: [
                    Sign.Extend(((Combined) & 0x3FF), 32, 10) / 512.0,
                    Sign.Extend(((Combined >> 10) & 0x3FF), 32, 10) / 512.0,
                    Sign.Extend(((Combined >> 20) & 0x3FF), 32, 10) / 512.0,
                ],
                Length: 4,
            };
        }
        case 39: { // Normal [PS3]
            const Combined = Stream.Buffer.read(0, 4, { ...Stream.Options, readAs: 'integer' });
            return {
                Data: [
                    Sign.Extend(((Combined) & 0x7FF), 32, 11) / 1024.0,
                    Sign.Extend(((Combined >> 11) & 0x7FF), 32, 11) / 1024.0,
                    Sign.Extend(((Combined >> 22) & 0x3FF), 32, 10) / 512.0,
                ],
                Length: 4,
            };
        }
        case 44: // Uv1 [PS3]
            return {
                Data: [
                    Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                    Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                ],
                Length: 4,
            };
        case 45: // Normal [ARCADE]
            return {
                Data: [
                    Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                    Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                    Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                    Stream.Buffer.read(0, 2, { ...Stream.Options, readAs: 'float16' }),
                ],
                Length: 8,
            };
        default:
            throw new Error(`\n ${Type} is a unknown type of data, please contact the iseeeva for this.`);
    }
}
