
const isFunctionPropValue = (props, propName) => typeof props[propName] === "function"

export const isEventHandler = (props, propName) => isEventHandlerName(propName) && isFunctionPropValue(props, propName)

export const isEventHandlerName = (propName) => propName.startsWith("on")