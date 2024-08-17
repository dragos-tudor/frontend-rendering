import { getEventName, getValidEventHandlerNames } from "./getting.js"
import { unstoreEventHandler } from "./unstoring.js"

export const unsetEventHandler = (elem, handlerName) =>
{
  elem.removeEventListener(getEventName(handlerName), elem[handlerName])
  unstoreEventHandler(elem, handlerName)
  return handlerName
}

export const unsetEventHandlers = (elem, props) => getValidEventHandlerNames(props).map(handlerName => unsetEventHandler(elem, handlerName))