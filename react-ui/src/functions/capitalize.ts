/**
 * Capitalize the first letter of a string
 * @param str
 * @returns string
 */
export function capitalize(str: string) {
  const output = str.toLowerCase();
  return output.charAt(0).toUpperCase() + output.slice(1);
}
