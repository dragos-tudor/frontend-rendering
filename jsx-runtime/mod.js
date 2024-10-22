import { compileJsxExpression } from "./expressions/compiling.js"
import { compileLegacyJsxExpression } from "./expressions/compiling.legacy.js"

export const jsx = compileJsxExpression
export const jsxs = compileJsxExpression
export const legacyJsx = compileLegacyJsxExpression
export { FragmentType as Fragment } from "../rendering-jsx/mod.js"