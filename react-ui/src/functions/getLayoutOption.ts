import { LayoutOptions, LAYOUT_OPTIONS } from '../constants';

/**
 * Given a string value, this function checks if it matches any of the values defined in the LAYOUT_OPTIONS object.
 * If it does, it returns the matching value. If not, it returns the default value 'list'
 *
 * @param value The string value to check
 * @returns The matching value from the LAYOUT_OPTIONS object, or 'list' if no match is found
 */
export const getLayoutOption = (value: string): LayoutOptions => {
  switch (value) {
    case LAYOUT_OPTIONS.GRID:
      return LAYOUT_OPTIONS.GRID;
    case LAYOUT_OPTIONS.LIST:
      return LAYOUT_OPTIONS.LIST;
    case LAYOUT_OPTIONS.COMPACT:
      return LAYOUT_OPTIONS.COMPACT;
    default:
      return LAYOUT_OPTIONS.LIST;
  }
};
