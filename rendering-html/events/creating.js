
export const createCustomEvent = (eventName, detail) => new CustomEvent(eventName, { bubbles: true, cancelable: true, detail })