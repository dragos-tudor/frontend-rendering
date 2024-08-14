import { getPropNames } from "../props-names/getting.js"
import { isSafeEventHandler } from "../security/validating.js"

export const getEventName = (handlerName) => handlerName.replace("on", "")

export const getValidEventHandlerNames = (props) => getPropNames(props).filter(propName => isSafeEventHandler(props, propName))