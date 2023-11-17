import { isValidPropName } from "./verifying.js"

export const getPropNames = (elem) => Object.getOwnPropertyNames(elem)

export const getValidPropNames = (elem, props) => getPropNames(props).filter(propName => isValidPropName(elem, props, propName))