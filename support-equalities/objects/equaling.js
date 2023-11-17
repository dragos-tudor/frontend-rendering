import { equalPrimitives } from "../primitives/equaling.js"
import { falsy } from "../primitives/getting.js"
import { equalValues } from "../values/equaling.js"
import { getObjectPropNames } from "./getting.js"
import { equalObjectsPropsCount, existsObjects, isReservedObjectPropName } from "./verifying.js"

const equalObjectsProp = (obj1, obj2, propName) => isReservedObjectPropName(propName) || equalValues(obj1[propName], obj2[propName])

const equalObjectsProps = (obj1, obj2) => getObjectPropNames(obj1).every(propName => equalObjectsProp(obj1, obj2, propName))

export const equalObjects = (obj1, obj2) => (
  (!existsObjects(obj1, obj2) && equalPrimitives) ||
  (!equalObjectsPropsCount(obj1, obj2) && falsy) ||
  equalObjectsProps
)(obj1, obj2)
