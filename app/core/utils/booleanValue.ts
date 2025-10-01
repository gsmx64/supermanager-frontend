// Converts various representations of boolean values to actual boolean types
export function booleanVerify(
  booleanValue: boolean | number
): boolean {
  if (typeof booleanValue === 'number') {
    if (booleanValue === 0) return false;
    if (booleanValue === 1) return true;
    throw new Error('Number value must be 0 or 1');
  }
  if (typeof booleanValue === 'boolean') {
    return booleanValue;
  }
  if (typeof booleanValue === 'string') {
    throw new Error('String values are not allowed');
  }
  if (booleanValue === null || booleanValue === undefined) {
    throw new Error('Null or undefined values are not allowed');
  }
  throw new Error('Value must be a boolean or 0/1 number');
};
