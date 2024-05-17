import { countObjectProps } from "./counting.js"

const ReservedPropNames = Object.freeze(["children"])

export const equalObjectsPropsCount = (obj1, obj2) => countObjectProps(obj1) === countObjectProps(obj2)

export const existsObject = (obj) => obj != null

export const existsObjects = (obj1, obj2) => existsObject(obj1) && existsObject(obj2)

export const isObjectType = (value) => typeof value === "object" && value !== null

export const isReservedObjectPropName = (propName) => ReservedPropNames.includes(propName)
