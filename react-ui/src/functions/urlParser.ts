import { FilterState } from '../redux/slices/filterSlice';

/*
 * Parses query from all possible filters
 */
export const parseQuery = (filters: FilterState) => {
  let validQueries: string[] = [];

  if (filters.search) {
    validQueries = validQueries.concat(`text=${filters.search}`);
  }

  if (filters.startTime) {
    validQueries = validQueries.concat(`start_time=${filters.startTime}`);
  }

  if (filters.endTime) {
    validQueries = validQueries.concat(`end_time=${filters.endTime}`);
  }

  if (filters.eventTypes.length) {
    validQueries = validQueries.concat(`keywords=${filters.eventTypes.join(',')}`);
  }

  if (filters.eventFeatures.length) {
    validQueries = validQueries.concat(`features=${filters.eventFeatures.join(',')}`);
  }

  if (filters.audiences.length) {
    validQueries = validQueries.concat(`audiences=${filters.audiences.join(',')}`);
  }

  if (filters.localities.length) {
    validQueries = validQueries.concat(`localities=${filters.localities.join(',')}`);
  }

  if (filters.typeId) {
    validQueries = validQueries.concat(`type_id=${filters.typeId}`);
  }

  if (filters.extraKeyword) {
    validQueries = validQueries.concat(`extra_keyword=${filters.extraKeyword}`);
  }

  if (filters.organization) {
    validQueries = validQueries.concat(`organization=${filters.organization}`);
  }

  if (filters.suitableFor?.length) {
    validQueries = validQueries.concat(`suitable_for=${filters.suitableFor.join(',')}`);
  }

  if (validQueries.length) {
    return `?${validQueries.join('&')}`;
  } else {
    return '';
  }
};
