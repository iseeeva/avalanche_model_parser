import type { HexReader } from 'r_lib';
/** Data Table for Octane 2 - PS3 */
export default function PS3(Type: number, Stream: {
    Buffer: HexReader;
    Options: object;
}): {
    Data: number[];
    Length: number;
};
