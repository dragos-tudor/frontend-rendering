import { getJsxLegacyChildren,  } from "../children/getting.js"
import { existsLegacyJsxChildren } from "../children/verifying.js"
import { compileJsxExpression } from "./compiling.js"

export const compileLegacyJsxExpression = (type, props, ...children) =>
  existsLegacyJsxChildren(children)?
    compileJsxExpression(type, props ?? {}):
    compileJsxExpression(type, { ...(props ?? {}), children: getJsxLegacyChildren(children) })


