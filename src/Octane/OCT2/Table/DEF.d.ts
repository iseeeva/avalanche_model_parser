import type { HexReader } from 'r_lib';
/** Data Table for Octane 2 - Default */
export default function Default(Type: number, Stream: {
    Buffer: HexReader;
    Options: object;
}): {
    Data: number[];
    Length: number;
};
