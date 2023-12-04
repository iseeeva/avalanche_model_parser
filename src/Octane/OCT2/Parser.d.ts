import type { Model, Octane } from '../Types/General.js';
/**
 * Octane 2: Model Parser
 **/
export default function (File: string, Options?: {
    Platform: Octane.OCT2.Platform;
    isLittle?: boolean;
}): Model.Database;
