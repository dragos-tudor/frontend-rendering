import { createJsxElement, createLegacyJsxElement } from "./elements/creating.js"
import { JsxFragmentType } from "./elements/types.js"

export const registerReact = (global = globalThis) =>
  global.React = global.React || Object.freeze({
    createElement: createLegacyJsxElement,
    Fragment: JsxFragmentType
  })

export const jsx = createJsxElement
export const jsxs = createJsxElement
export const legacyJsx = createLegacyJsxElement
export const Fragment = JsxFragmentType