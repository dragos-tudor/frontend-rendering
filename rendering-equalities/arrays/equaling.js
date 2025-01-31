import { equalPrimitives } from "../primitives/equaling.js"
import { equalValues } from "../values/equaling.js"
import { equalArraysLength } from "./verifying.js"
import { existArrays } from "./verifying.js"

const equalArrayItems = (arr1, arr2) => arr1.every((_, index) => equalValues(arr1[index], arr2[index]))

export const equalArrays = (arr1, arr2) => {
  if (!existArrays(arr1, arr2)) return equalPrimitives(arr1, arr2)
  if (!equalArraysLength(arr1, arr2)) return false
  return equalArrayItems(arr1, arr2)
}

