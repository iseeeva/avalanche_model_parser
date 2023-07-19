import OCT2 from './lib/OCT2.js';
import OCT3 from './lib/OCT3.js';
export default function Init(Type, Filename, Options) {
    switch (Type) {
        case 'oct2':
            return OCT2(Filename, { swap_endian: Options.swap_endian });
        case 'oct3':
            return OCT3(Filename, { swap_endian: Options.swap_endian });
        default:
            throw new Error(`${Type} is unknown type`);
    }
}
