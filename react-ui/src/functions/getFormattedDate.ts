import dayjs, { Dayjs } from 'dayjs';

/**
 * getApiFormattedDate returns a date string
 * @param date any date value
 * @returns date in format of YYYY-MM-DD
 */
export const getApiFormattedDate = (
  date: string | number | Date | Dayjs | null | undefined,
): string | null => {
  if (!dayjs(date).isValid()) return null;
  return dayjs(date).format('YYYY-MM-DD');
};
