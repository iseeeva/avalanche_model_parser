import Default from './DEF.js';
/** Data Table for Octane 3 - PS4 */
export default function PS4(Type, Info, Stream) {
    switch (Type) {
        default:
            return Default(Type, Info, Stream);
    }
}
