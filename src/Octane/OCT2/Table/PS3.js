import Default from './DEF.js';
/** Data Table for Octane 2 - PS3 */
export default function PS3(Type, Stream) {
    switch (Type) {
        default:
            return Default(Type, Stream);
    }
}
