import { equalData } from "../data/equaling.js"
import { equalArraysLength } from "./verifying.js"
import { equalValues } from "../values/equaling.js"
import { existArrays } from "./verifying.js"

const equalArrayItems = (arr1, arr2) => arr1.every((_, index) => equalData(arr1[index], arr2[index]))

export const equalArrays = (arr1, arr2) => {
  if (!existArrays(arr1, arr2)) return equalValues(arr1, arr2)
  if (!equalArraysLength(arr1, arr2)) return false
  return equalArrayItems(arr1, arr2)
}

