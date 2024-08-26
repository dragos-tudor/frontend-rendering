import { getHtmlEventName } from "../event-names/getting.js"
import { getValidHtmlEventHandlerNames } from "../handler-names/getting.js"
import { getEventHandlerFromStore } from "./getting.js"
import { unstoreHtmlEventHandler } from "./unstoring.js"

export const unsetHtmlEventHandler = (elem, handlerName) =>
{
  elem.removeEventListener(getHtmlEventName(handlerName), getEventHandlerFromStore(elem, handlerName))
  unstoreHtmlEventHandler(elem, handlerName)
  return handlerName
}

export const unsetHtmlEventHandlers = (elem, props) => getValidHtmlEventHandlerNames(props).map(handlerName => unsetHtmlEventHandler(elem, handlerName))