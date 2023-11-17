import { createCustomEvent } from "./creating.js"

export const dispatchEvent = (elem, eventName, detail) => elem.dispatchEvent(createCustomEvent(eventName, detail))



