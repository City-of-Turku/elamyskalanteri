import { virtualEventTranslated } from '../constants';
import { Event, EventLocation } from '../types';
import { capitalize } from './capitalize';
import { getTranslatedValue } from './getTranslatedValue';

/**
 * @description Returns the location title in the correct language
 * @param location EventLocation | null
 * @param locationExtraInfo Event['location_extra_info']
 * @param isVirtualEvent boolean
 * @param currentLang string
 * @returns string
 */
export function getLocationTitle(
  location: EventLocation | null,
  locationExtraInfo: Event['location_extra_info'] | null,
  isVirtualEvent: boolean,
  currentLang: string,
) {
  // Returns the virtual event text in the correct language, capitalized
  const getVirtualEventText = () =>
    capitalize(getTranslatedValue(virtualEventTranslated, currentLang) || '');

  // Returns the location name or street address or location extra info in the correct language
  const getLocationName = () => {
    if (location) {
      // Try to return the translated location name
      const translatedLocationName = getTranslatedValue(location.name, currentLang);
      if (translatedLocationName) return translatedLocationName;

      // If the location name is not available, try to return the translated street address
      const translatedStreetAddress = getTranslatedValue(location.street_address, currentLang);
      if (translatedStreetAddress) return translatedStreetAddress;
    }

    // If the location name and street address are not available, try to return the translated location extra info
    return getTranslatedValue(locationExtraInfo, currentLang) || '';
  };

  // If the event is virtual, return the virtual event text and the location name (if available)
  // If the event is not virtual, return the location name (if available)
  return isVirtualEvent
    ? `${getVirtualEventText()}${getLocationName() ? ` / ${getLocationName()}` : ''}`
    : getLocationName();
}
