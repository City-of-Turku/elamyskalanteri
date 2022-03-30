export const removeQueryParam = (hash: string, string: string): string => {

  // Index where the query starts
  const queryStartIndex = hash.indexOf("?")

  // Find the start index of the query string
  const stringIndex = hash.indexOf(string, queryStartIndex + 1)

  // If string is not present => return the hash
  if (stringIndex === -1) {
    return hash
  }
  // Find out where the query string ends
  const nextParamIndex = hash.indexOf("&", stringIndex + 1)

  // If the string is the first query param
  const isFirstQueryParam = hash.charAt(stringIndex - 1) === "?"

  // The query string is the only query
  if (isFirstQueryParam && nextParamIndex === -1) {
    // substring should contain the query and the question mark at the beginning
    let substring = hash.substring(stringIndex - 1)
    return hash.replace(substring, "")
  }

  // Is first query param and there is more than one
  if (isFirstQueryParam) {
    let substring = hash.substring(stringIndex, nextParamIndex + 1)
    return hash.replace(substring, "")
  }

  // If there is no next query param
  if (nextParamIndex === -1 ) {
    let substring = hash.substring(stringIndex - 1)
    return hash.replace(substring, "")
  }

  let substring = hash.substring(stringIndex, nextParamIndex + 1)
  return hash.replace(substring, "")

}

export const addQueryParam = (hash: string, string: string): string => {
  const queryStartIndex = hash.indexOf("?")

  const term = string.substring(0, string.indexOf("="))

  if (hash.indexOf(term) !== -1) {
    return updateQueryParam(hash, string, term)
  }

  if (queryStartIndex === -1) {
    return hash + "?" + string
  }
  return hash + "&" + string
}

const updateQueryParam = (hash: string, string: string, term: string): string => {
  let substring = hash.substring(hash.indexOf(term, hash.indexOf("&")))
  return hash.replace(substring, string)

}