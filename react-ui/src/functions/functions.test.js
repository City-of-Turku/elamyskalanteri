import {filterByCategory} from "./sorters";

test("filterByCategory: Providing no params to the function returns the original array", () => {
  const testArr = [
    {type_id: "Dance"},
    {type_id: "Musical"},
    {type_id: "Art"}
  ]
  const params = []
  const filteredArr = filterByCategory(testArr, params)
  expect(filteredArr).toStrictEqual(testArr)
})

test("filterByCategory: Providing params that do not match anything on the test array return empty array", () => {
  const testArr = [
    {type_id: "Dance"},
    {type_id: "Musical"},
    {type_id: "Art"}
  ]
  const params = ["I dont exists"]
  const filteredArr = filterByCategory(testArr, params)
  expect(filteredArr).toStrictEqual([])
})

test("filterByCategory: Filter returns array with filtered content matching params array", () => {
  const testArr = [
    {type_id: "Dance"},
    {type_id: "Musical"},
    {type_id: "Art"}
  ]
  const params = ["Art"]
  const filteredArr = filterByCategory(testArr, params)
  expect(filteredArr).toStrictEqual([{type_id: "art"}])
})