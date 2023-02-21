export const arrayFromCommaList = (value: unknown): [] | string[] => {
  if (typeof value === 'string') {
    return value?.split(',');
  }
  return [];
};
