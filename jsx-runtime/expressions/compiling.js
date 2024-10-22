import { createJsxElement } from "../../rendering-jsx/mod.js"
import { getJsxInternals, getJsxParent } from "../internals/getting.js"
import { resolveJsxPropsKey, resolveJsxPropsRef, resolveJsxProps } from "../props/resolving.js"

export const compileJsxExpression = (type, props, maybeKey) =>
  createJsxElement(
    type,
    resolveJsxProps(props, type),
    resolveJsxPropsKey(props, maybeKey),
    getJsxParent(getJsxInternals(globalThis["React"])),
    resolveJsxPropsRef(props),
  )


