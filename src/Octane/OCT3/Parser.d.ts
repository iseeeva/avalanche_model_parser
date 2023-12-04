import type { Model, Octane } from '../Types/General.js';
/**
 * Octane 3: Model Parser
 **/
export default function (File: string, Options?: {
    Platform: Octane.OCT3.Platform;
    isLittle?: boolean;
}): Model.Database;
