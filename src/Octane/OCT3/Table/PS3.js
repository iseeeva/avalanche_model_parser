import Default from './DEF.js';
/** Data Table for Octane 3 - PS3 */
export default function PS3(Type, Info, Stream) {
    switch (Type) {
        default:
            return Default(Type, Info, Stream);
    }
}
