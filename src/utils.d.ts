/**
 * Check XML Array (for xml-js library)
 */
export declare function XMLArray(Input: any): any[];
/**
 * Fill the Object with Path
 **/
export declare function FillObject(Object: Object, Path: string[]): void;
export declare class Sign {
    /**
     * Integer to Signed Short
     **/
    static Short(Value: number): number;
    /**
     * Extend value for a sign
     **/
    static Extend(Value: number, Type: number, Bits: number): number;
}
