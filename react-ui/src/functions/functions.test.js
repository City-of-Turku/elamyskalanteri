import {filterByCategory} from "./sorters";
import { removeQueryParam, addQueryParam } from "./urlParser";

//test("filterByCategory: Providing no params to the function returns the original array", () => {
//  const testArr = [
//    {type_id: "Dance"},
//    {type_id: "Musical"},
//    {type_id: "Art"}
//  ]
//  const params = []
//  const filteredArr = filterByCategory(testArr, params)
//  expect(filteredArr).toStrictEqual(testArr)
//})
//
//test("filterByCategory: Providing params that do not match anything on the test array return empty array", () => {
//  const testArr = [
//    {type_id: "Dance"},
//    {type_id: "Musical"},
//    {type_id: "Art"}
//  ]
//  const params = ["I dont exists"]
//  const filteredArr = filterByCategory(testArr, params)
//  expect(filteredArr).toStrictEqual([])
//})
//
//test("filterByCategory: Filter returns array with filtered content matching params array", () => {
//  const testArr = [
//    {type_id: "Dance"},
//    {type_id: "Musical"},
//    {type_id: "Art"}
//  ]
//  const params = ["Art"]
//  const filteredArr = filterByCategory(testArr, params)
//  expect(filteredArr).toStrictEqual([{type_id: "art"}])
//})

test("if no filter param is found, return original hash", () => {
  const hash = "#"
  const newHash = removeQueryParam(hash, "text")
  expect(newHash).toStrictEqual("#")
})

test("If the filter param is the only one, remove it", () => {
  const hash = "#eventlist/turku:988554?test=true"
  const newHash = removeQueryParam(hash, "test")
  expect(newHash).toStrictEqual("#eventlist/turku:988554")
})

test("If the filter param is the first one, remove it and keep the rest", () => {
  const hash = "#eventlist/turku:988554?test=true&is_free=false&hard=true"
  const newHash = removeQueryParam(hash, "test")
  expect(newHash).toStrictEqual("#eventlist/turku:988554?is_free=false&hard=true")
})

test("If the filter param is not the first one, remove it and keep the rest", () => {
  const hash = "#eventlist/turku:988554?test=true&is_free=false"
  const newHash = removeQueryParam(hash, "is_free")
  expect(newHash).toStrictEqual("#eventlist/turku:988554?test=true")
})

test("If the filter param is not the first one nor the last one, remove it and keep the rest", () => {
  const hash = "#eventlist/turku:988554?test=true&is_free=false&hard=true"
  const newHash = removeQueryParam(hash, "is_free")
  expect(newHash).toStrictEqual("#eventlist/turku:988554?test=true&hard=true")
})

test("Add hash param if none exist", () => {
  const hash = "#"
  const newHash = addQueryParam(hash, "text=abc")
  expect(newHash).toStrictEqual("#?text=abc")
})

test("Add hash param if they already exist", () => {
  const hash = "#?text=abc"
  const newHash = addQueryParam(hash, "is_free=true")
  expect(newHash).toStrictEqual("#?text=abc&is_free=true")
})
