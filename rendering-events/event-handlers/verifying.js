
const isFunctionHtmlPropValue = (props, propName) => typeof props[propName] === "function"

export const isHtmlEventHandler = (props, propName) => isHtmlEventHandlerName(propName) && isFunctionHtmlPropValue(props, propName)

export const isHtmlEventHandlerName = (propName) => propName.startsWith("on")