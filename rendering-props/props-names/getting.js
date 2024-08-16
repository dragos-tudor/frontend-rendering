import { isValidPropName } from "./verifying.js"


export const getPropNames = (elem) => Object.getOwnPropertyNames(elem)

export const getValidPropNames = (props, tagName) => getPropNames(props).filter(propName => isValidPropName(props, propName, tagName))