import Default from './DEF.js';
/** Data Table for Octane 2 - PC */
export default function PC(Type, Stream) {
    switch (Type) {
        default:
            return Default(Type, Stream);
    }
}
