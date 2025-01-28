import { FragmentType } from "../rendering-jsx/mod.js"
import { compileJsxExpression } from "./expressions/compiling.js"
import { compileLegacyJsxExpression } from "./expressions/compiling.legacy.js"

export const registerReact = (global = globalThis) =>
  global.React = global.React || Object.freeze({
    createElement: compileLegacyJsxExpression,
    Fragment: FragmentType
  })

export const jsx = compileJsxExpression
export const jsxs = compileJsxExpression
export const legacyJsx = compileLegacyJsxExpression
export const Fragment = FragmentType