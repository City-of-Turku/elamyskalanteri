import { DEFAULT_LANGUAGE } from '../translations/TranslationProvider';

/**
 * getTranslatedValue returns the translated string value of an object
 * @param obj an object containing translated strings
 * @param langCode the language code to get the translation for
 * @returns translated string or null if not found
 */
export const getTranslatedValue = (
  obj: Record<string, unknown> | null,
  langCode: string = DEFAULT_LANGUAGE,
): string | undefined => {
  // If obj is null, return undefined
  if (!obj) {
    return undefined;
  }

  // Check if obj has a property with key of langCode
  let translated = Object.prototype.hasOwnProperty.call(obj, langCode) && obj[langCode];

  // If obj does not have a property with key of langCode
  if (!translated) {
    // Iterate over all the keys of obj
    Object.keys(obj).forEach((key) => {
      // Assign the value of the current key to translated variable
      // if translated is not yet set
      if (!translated) {
        translated = obj[key];
      }
    });
  }

  // Return the value of translated if it's a string, otherwise return null
  return typeof translated === 'string' ? translated : undefined;
};
