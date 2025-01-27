import { toJsxChildreArray } from "../children/converting.js"
import { existsJsxChildren } from "../children/verifying.js"
import { setJsxPropChildren } from "../props/setting.js"
import { compileJsxExpression } from "./compiling.js"

export const compileLegacyJsxExpression = (type, props, ...children) =>
  existsJsxChildren(children)?
    compileJsxExpression(type, setJsxPropChildren(props ?? {}, toJsxChildreArray(children))):
    compileJsxExpression(type, props ?? {})



