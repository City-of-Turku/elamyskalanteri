import { DataAttributes, DATA_ATTRIBUTES } from '../constants';
import { appDataAttributes } from '../types';

/**
 * Checks if given string belongs to list of accepted data attributes
 */
export function isKnownDataAttribute(x: string): x is DataAttributes {
  return DATA_ATTRIBUTES.includes(x as DataAttributes);
}

export function checkUsedAttributes(data: appDataAttributes) {
  Object.keys(data).forEach((d) => {
    if (!isKnownDataAttribute(d)) return console.warn('Unexpected data-attribute', d);
  });
}
