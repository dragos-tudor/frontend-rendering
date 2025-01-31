import { equalPrimitives } from "../primitives/equaling.js"
import { equalValues } from "../values/equaling.js"
import { getObjectPropNames } from "./getting.js"
import { equalObjectsPropsLength, existsObjects, isReservedObjectPropName } from "./verifying.js"

const equalObjectsProp = (obj1, obj2, propName) => isReservedObjectPropName(propName) || equalValues(obj1[propName], obj2[propName])

const equalObjectsProps = (obj1, obj2) => getObjectPropNames(obj1).every(propName => equalObjectsProp(obj1, obj2, propName))

export const equalObjects = (obj1, obj2) => {
  if (!existsObjects(obj1, obj2)) return equalPrimitives(obj1, obj2)
  if (!equalObjectsPropsLength(obj1, obj2)) return false
  return equalObjectsProps(obj1, obj2)
}
