import { getObjectPropsLength } from "./getting.js"

const ReservedPropNames = Object.freeze(["children"])

export const equalObjectsPropsLength = (obj1, obj2) => getObjectPropsLength(obj1) === getObjectPropsLength(obj2)

export const existsObject = (obj) => obj != null

export const existsObjects = (obj1, obj2) => existsObject(obj1) && existsObject(obj2)

export const isObjectType = (value) => typeof value === "object" && value !== null

export const isReservedObjectPropName = (propName) => ReservedPropNames.includes(propName)
