import Default from './DEF.js';
/** Data Table for Octane 2 - XBOX */
export default function XBOX(Type, Stream) {
    switch (Type) {
        default:
            return Default(Type, Stream);
    }
}
