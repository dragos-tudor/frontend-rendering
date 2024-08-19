import { isValidHtmlPropName } from "./verifying.js"


export const getHtmlPropNames = (elem) => Object.getOwnPropertyNames(elem)

export const getValidHtmlPropNames = (props, tagName) => getHtmlPropNames(props).filter(propName => isValidHtmlPropName(props, propName, tagName))