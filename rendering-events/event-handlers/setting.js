import { getValidHtmlEventHandlerNames } from "./getting.js";
import { storeHtmlEventHandler } from "./storing.js"
import { unsetHtmlEventHandler } from "./unsetting.js"

export const setHtmlEventHandler = (elem, handlerName, handler) =>
{
  unsetHtmlEventHandler(elem, handlerName)
  storeHtmlEventHandler(elem, handlerName, handler)
  return handlerName
}

export const setHtmlEventHandlers = (elem, props) => getValidHtmlEventHandlerNames(props).map(handlerName => setHtmlEventHandler(elem, handlerName, props[handlerName]))