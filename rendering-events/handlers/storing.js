import { getEventHandlerStoreName } from "./getting.js";

export const storeHtmlEventHandler = (elem, handlerName, handler) => elem[getEventHandlerStoreName(handlerName)] = handler