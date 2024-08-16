import { getEventName } from "./getting.js"
import { unstoreEventHandler } from "./unstoring.js"

export const unsetEventHandler = (elem, handlerName) =>
{
  elem.removeEventListener(getEventName(handlerName), elem[handlerName])
  unstoreEventHandler(elem, handlerName)
  return handlerName
}

export const unsetEventHandlers = (elem, eventHandlers) => eventHandlers.map(handlerName => unsetEventHandler(elem, handlerName))