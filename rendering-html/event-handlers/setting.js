import { getValidEventHandlerNames } from "./getting.js"
import { storeEventHandler } from "./storing.js"
import { unsetEventHandler } from "./unsetting.js"

export const setEventHandler = (elem, handlerName, handler) => {
  unsetEventHandler(elem, handlerName)

  // elem.addEventListener(getEventName(handlerName), handler)
  storeEventHandler(elem, handlerName, handler)

  return handlerName
}

export const setEventHandlers = (elem, props) =>
  getValidEventHandlerNames(props)
    .map(handlerName => setEventHandler(elem, handlerName, props[handlerName]))