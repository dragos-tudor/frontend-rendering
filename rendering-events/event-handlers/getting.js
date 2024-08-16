import { isEventHandler } from "./verifying.js";

const getPropNames = (props) => Object.getOwnPropertyNames(props)

export const getEventName = (handlerName) => handlerName.replace("on", "")

export const getValidEventHandlerNames = (props) => getPropNames(props).filter(propName => isEventHandler(props, propName))