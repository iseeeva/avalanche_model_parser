import type { TDatabase } from './types/database.js';
/**
 * OCT(XML) Model Parser
 **/
export default function Parser(OctFileName: string, Options?: {
    swap_endian: boolean;
}): TDatabase;
