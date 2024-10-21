import { registerDOMParser } from "./rendering-html/mod.js"

try {
  globalThis["DOMParser"] || await registerDOMParser()
}
catch(error) {
  console.error(error)
  throw error
}

export * from "./rendering/mod.js"
export * from "./rendering-components/mod.js"
export * from "./rendering-effects/public.js"
export * from "./rendering-events/public.js"
export * from "./rendering-states/public.js"

