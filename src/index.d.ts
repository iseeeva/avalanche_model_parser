import type { TDatabase } from './lib/types/database.js';
export type OCType = 'oct2' | 'oct3';
export default function Init(Type: OCType, Filename: string, Options?: {
    swap_endian?: boolean;
}): TDatabase;
