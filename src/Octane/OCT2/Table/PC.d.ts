import type { HexReader } from 'r_lib';
/** Data Table for Octane 2 - PC */
export default function PC(Type: number, Stream: {
    Buffer: HexReader;
    Options: object;
}): {
    Data: number[];
    Length: number;
};
