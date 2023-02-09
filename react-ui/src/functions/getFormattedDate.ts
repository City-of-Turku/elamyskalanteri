import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fi';
import 'dayjs/locale/sv';

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

/**
 * Returns a formatted string representing the start and end dates and times,
 * in the specified locale.
 * If the start and end dates are the same, only the start date+time is returned.
 * If the start and end times are the same, the start date+time and end time is returned.
 * If the start and end times are different, the full string is returned.
 *
 * @param startDate The start date and time in ISO format, or null.
 * @param endDate The end date and time in ISO format, or null.
 * @param locale The locale to use for formatting the date and time.
 * @param showWeekday Whether to show the weekday in the formatted string.
 * @returns A formatted string representing the start and end dates and times, or null.
 */
export function getFormattedDateTime(
  startDate: Date | null,
  endDate: Date | null,
  locale: string,
  showWeekday = false,
): string | null {
  if (!startDate) {
    return null;
  }

  const start = dayjs(startDate).locale(locale);
  const dateTimeformat = showWeekday ? 'dddd DD.MM.YYYY | HH:mm' : 'DD.MM.YYYY | HH:mm';
  const timeFormat = 'HH:mm';

  if (!endDate) {
    return `${start.format(dateTimeformat)}`;
  }

  const end = dayjs(endDate).locale(locale);

  if (start.isSame(end, 'day')) {
    if (start.isSame(end, 'minute')) {
      return start.format(dateTimeformat);
    } else {
      return `${start.format(dateTimeformat)} - ${end.format(timeFormat)}`;
    }
  } else {
    return `${start.format(dateTimeformat)} - ${end.format(dateTimeformat)}`;
  }
}
