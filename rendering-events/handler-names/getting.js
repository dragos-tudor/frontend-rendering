import { isFunctionHtmlPropValue } from "../handler-values/verifying.js"
import { isHtmlEventHandlerName } from "./verifying.js"

const getHtmlPropNames = (props) => Object.getOwnPropertyNames(props)

export const getValidHtmlEventHandlerNames = (props) => getHtmlPropNames(props).filter(isHtmlEventHandlerName).filter(propName => isFunctionHtmlPropValue(props, propName))