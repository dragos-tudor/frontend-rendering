import { getHtmlEventName, getValidHtmlEventHandlerNames } from "./getting.js"
import { unstoreHtmlEventHandler } from "./unstoring.js"

export const unsetHtmlEventHandler = (elem, handlerName) =>
{
  elem.removeEventListener(getHtmlEventName(handlerName), elem[handlerName])
  unstoreHtmlEventHandler(elem, handlerName)
  return handlerName
}

export const unsetHtmlEventHandlers = (elem, props) => getValidHtmlEventHandlerNames(props).map(handlerName => unsetHtmlEventHandler(elem, handlerName))