import { registerDOMParser } from "./rendering-html/mod.js"
import{ createElement, Fragment } from "./rendering-jsx/public.js"

try {
  globalThis["DOMParser"] || await registerDOMParser()
  globalThis["React"] = globalThis["React"] ?? {}
  globalThis["React"].createElement = createElement
  globalThis["React"].Fragment = Fragment
}
catch(error) {
  console.error(error)
  throw error
}

export * from "./rendering/mod.js"
export * from "./rendering-components/mod.js"
export * from "./rendering-html/public.js"
export * from "./rendering-jsx/public.js"
export { useEffect, getEffects } from "./rendering-effects/mod.js"
export { useMemo, useState, getStates } from "./rendering-states/mod.js"