import type { HexReader } from 'r_lib';
/** Data Table for Octane 2 - XBOX */
export default function XBOX(Type: number, Stream: {
    Buffer: HexReader;
    Options: object;
}): {
    Data: number[];
    Length: number;
};
