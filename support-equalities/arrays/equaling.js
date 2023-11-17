import { equalPrimitives } from "../primitives/equaling.js"
import { falsy } from "../primitives/getting.js"
import { equalValues } from "../values/equaling.js"
import { equalArraysLength } from "./verifying.js"
import { existsArrays } from "./verifying.js"

const equalArrayItems = (arr1, arr2) => arr1.every((_, index) => equalValues(arr1[index], arr2[index]))

export const equalArrays = (arr1, arr2) => (
  (!existsArrays(arr1, arr2) && equalPrimitives) ||
  (!equalArraysLength(arr1, arr2) && falsy) ||
  equalArrayItems
)(arr1, arr2)

