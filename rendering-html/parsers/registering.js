
export const registerDomParser = async (url, global = globalThis) =>
  Object.assign(global, { ...await import(url) })

export const registerLinkeDomParser = async (url = "npm:linkedom@0.18.5", global = globalThis) =>
  Object.assign(global, {
    ...await import(url) ,
    Event: global.Event,
    InputEvent: global.InputEvent,
    EventTarget: global.EventTarget
  })