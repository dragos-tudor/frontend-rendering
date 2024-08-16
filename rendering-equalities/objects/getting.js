import { isReservedObjectPropName } from "./verifying.js"

export const getObjectPropNames = (obj) => Object.getOwnPropertyNames(obj)

export const getObjectPropsLength = (obj) => getObjectPropNames(obj).filter(propName => !isReservedObjectPropName(propName)).length