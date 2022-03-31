export const parseQuery = (filters: any) => {
  console.log(filters)
  let validQueries: any[] = []

  if (filters.name) {
    validQueries = validQueries.concat(`text=${filters.name}`)
  }

  if (filters.eventTypes.length) {
    validQueries = validQueries.concat(`keywords=${filters.eventTypes.join(",")}`)
  }

  if (filters.eventFeatures.length) {
    validQueries = validQueries.concat(filters.eventFeatures.join("&"))
  }

  if (validQueries.length) {
    return(`?${validQueries.join("&")}`)
  }
  else {
    return("")
  }
}