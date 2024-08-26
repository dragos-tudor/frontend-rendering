import { getHtmlEventName } from "../event-names/getting.js"
import { getValidHtmlEventHandlerNames } from "../handler-names/getting.js"
import { storeHtmlEventHandler } from "./storing.js"

export const setHtmlEventHandler = (elem, handlerName, handler) =>
{
  elem.addEventListener(getHtmlEventName(handlerName), handler)
  storeHtmlEventHandler(elem, handlerName, handler)
  return handlerName
}

export const setHtmlEventHandlers = (elem, props) => getValidHtmlEventHandlerNames(props).map(handlerName => setHtmlEventHandler(elem, handlerName, props[handlerName]))