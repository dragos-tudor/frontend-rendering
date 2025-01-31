import { isArrayType } from "../arrays/verifying.js"
import { equalArrays } from "../arrays/equaling.js"
import { isFunctionType } from "../funcs/verifying.js"
import { isObjectType } from "../objects/verifying.js"
import { equalObjects } from "../objects/equaling.js"
import { equalPrimitives } from "../primitives/equaling.js"

export const equalValues = (value1, value2) => {
  if (isFunctionType(value1) && isFunctionType(value2)) return true
  if (isArrayType(value1) && isArrayType(value2)) return equalArrays(value1, value2)
  if (isObjectType(value1) && isObjectType(value2)) return equalObjects(value1, value2)
  return equalPrimitives(value1, value2)
}