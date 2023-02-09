export function truncate(str: string, chars = 100): string {
  if (str.length <= chars) {
    return str;
  }
  return str.substring(0, chars) + '...';
}
