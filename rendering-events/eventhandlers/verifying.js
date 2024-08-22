import { isHtmlEventHandlerName } from "../eventhandler-names/verifying.js";

const isFunctionHtmlPropValue = (props, propName) => typeof props[propName] === "function"

export const isHtmlEventHandler = (props, propName) => isHtmlEventHandlerName(propName) && isFunctionHtmlPropValue(props, propName)

