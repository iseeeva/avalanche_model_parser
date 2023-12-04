/**
 * Check XML Array (for xml-js library)
 */
export function XMLArray(Input) {
    return Array.isArray(Input) ? Input : [Input];
}
/**
 * Fill the Object with Path
 **/
export function FillObject(Object, Path) {
    let Current = Object;
    for (const Key of Path) {
        Current[Key] ||= {};
        Current = Current[Key];
    }
}
export class Sign {
    /**
     * Integer to Signed Short
     **/
    static Short(Value) {
        return Value >= 0x8000 ? Value - 0x10000 : Value;
    }
    /**
     * Extend value for a sign
     **/
    static Extend(Value, Type, Bits) {
        const Shift = Type - Bits;
        return (Value << Shift) >> Shift;
    }
}
