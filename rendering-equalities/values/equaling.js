import { isArrayType } from "../arrays/verifying.js"
import { equalArrays } from "../arrays/equaling.js"
import { isFunctionType } from "../funcs/verifying.js"
import { isObjectType } from "../objects/verifying.js"
import { equalObjects } from "../objects/equaling.js"
import { equalPrimitives } from "../primitives/equaling.js"
import { truthy } from "../primitives/getting.js"


export const equalValues = (value1, value2) => (
  (isFunctionType(value1) && isFunctionType(value2) && truthy) ||
  (isArrayType(value1) && isArrayType(value2) && equalArrays) ||
  (isObjectType(value1) && isObjectType(value2) && equalObjects) ||
  equalPrimitives
)(value1, value2)



