import { isSafeHtmlPropName } from "../prop-security/verifying.js";
import { isValidHtmlPropName } from "./verifying.js"


export const getHtmlPropNames = (elem) => Object.getOwnPropertyNames(elem)

export const getValidHtmlPropNames = (elem, props) => getHtmlPropNames(props).filter(propName => isValidHtmlPropName(elem, propName)).filter(propName => isSafeHtmlPropName(props, propName))