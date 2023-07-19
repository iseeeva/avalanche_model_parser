/**
 * Remove All Spaces from The String
 **/
export const RemoveSpace = (str) => str.replace(/\s+/, '');
/**
 * Fill The JSON Object with Path
 **/
export function FillObject(Object, Path) {
    let Current = Object;
    for (const Key of Path) {
        Current[Key] ||= {};
        Current = Current[Key];
    }
}
/**
 * Extend Value For a Sign
 **/
export function SignExtend(value, type, bits) {
    const shift = type - bits;
    return (value << shift) >> shift;
}
/**
 * Integer to Signed Short
 **/
export function SignShort(value) {
    return value >= 0x8000 ? value - 0x10000 : value;
}
