import { legacyJsx, Fragment } from "./jsx-runtime/mod.js"

globalThis.React = globalThis.React || Object.freeze({
  createElement: legacyJsx,
  Fragment
})

export { registerDomParser, registerLinkeDomParser } from "./rendering-html/mod.js"
export * from "./rendering/mod.js"
export * from "./rendering-components/mod.js"
export * from "./rendering-effects/public.js"
export * from "./rendering-events/public.js"
export * from "./rendering-states/public.js"

