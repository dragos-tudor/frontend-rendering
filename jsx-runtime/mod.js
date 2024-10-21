import { compileJsxExpression, compileLegacyJsxExpression } from "./expressions/compiling.js"

export const jsx = compileJsxExpression
export const jsxs = compileJsxExpression
export const legacyJsx = compileLegacyJsxExpression
export { FragmentType as Fragment } from "../rendering-jsx/mod.js"