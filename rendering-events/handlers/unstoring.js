import { getEventHandlerStoreName } from "./getting.js"

export const unstoreHtmlEventHandler = (elem, handlerName) => delete elem[getEventHandlerStoreName(handlerName)]