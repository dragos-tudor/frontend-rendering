import { storeEventHandler } from "./storing.js"
import { unsetEventHandler } from "./unsetting.js"

export const setEventHandler = (elem, handlerName, handler) =>
{
  unsetEventHandler(elem, handlerName)
  storeEventHandler(elem, handlerName, handler)
  return handlerName
}

export const setEventHandlers = (elem, props, eventHandlers) => eventHandlers.map(handlerName => setEventHandler(elem, handlerName, props[handlerName]))