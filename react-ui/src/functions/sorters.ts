export const filterByCategory = (arr: any[], filterParams: any) => {
  // If no params provided return original array
  if (!filterParams.length) {
    return arr;
  }
  return arr.filter((arrItem) => filterParams.includes(arrItem.type_id));
};

// WIP, confirm event_type field
export const filterByEventType = (arr: any[], filterParams: any) => {
  // If no params provided return original array
  if (!filterParams.length) {
    return arr;
  }
  return arr.filter((arrItem) => filterParams.includes(arrItem.event_type));
};

// WIP, confirm content_type field
export const filterByContentType = (arr: any[], filterParams: any) => {
  // If no params provided return original array
  if (!filterParams.length) {
    return arr;
  }
  return arr.filter((arrItem) => filterParams.includes(arrItem.content_type));
};
