export const parseQuery = (filters: any) => {
  let validQueries: any[] = []

  if (filters.search) {
    validQueries = validQueries.concat(`text=${filters.search}`)
  }

  if (filters.eventTypes.length) {
    validQueries = validQueries.concat(`keywords=${filters.eventTypes.join(",")}`)
  }

  if (filters.eventFeatures.length) {
    validQueries = validQueries.concat(`features=${filters.eventFeatures.join(",")}`)
  }

  if (validQueries.length) {
    return(`?${validQueries.join("&")}`)
  }
  else {
    return("")
  }
}