import type { HexReader } from 'r_lib';
/** Data Table for Octane 3 - PS4 */
export default function PS4(Type: number, Info: {
    Scale: {
        X: number;
        Y: number;
        Z: number;
    };
}, Stream: {
    Buffer: HexReader;
    Options: object;
}): {
    Data: {
        Uv1?: number[];
        Position?: number[];
        BoneIndices?: number[];
        BlendWeights?: number[];
        Normal?: number[];
    };
    Length: number;
};
