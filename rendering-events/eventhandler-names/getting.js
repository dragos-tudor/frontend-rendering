import { isHtmlEventHandler } from "../eventhandlers/verifying.js"

const getHtmlPropNames = (props) => Object.getOwnPropertyNames(props)

export const getHtmlEventName = (handlerName) => handlerName.replace("on", "")

export const getValidHtmlEventHandlerNames = (props) => getHtmlPropNames(props).filter(propName => isHtmlEventHandler(props, propName))