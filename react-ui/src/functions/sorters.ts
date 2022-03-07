interface IParams {
  categories: []
}


// @ts-ignore
export const filterByCategory = (arr, filterParams) => {
  // If no params provided return original array
  if (!filterParams.length) {
    return arr
  }
// @ts-ignore
  return arr.filter(arrItem => filterParams.includes(arrItem.type_id))
}
// @ts-ignore
export const filterByEventType = (arr, filterParams) => {
  // If no params provided return original array
  if (!filterParams.length) {
    return arr
  }
  // @ts-ignore
  return arr.filter(arrItem => filterParams.includes(arrItem.event_type))
}