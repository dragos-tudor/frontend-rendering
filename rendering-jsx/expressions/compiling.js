import { createJsxElement } from "../elements/creating.js"
import { getJsxInternals, getJsxParent } from "../internals/getting.js"
import { resolveJsxPropsyKey, resolveJsxPropsRef, resolveJsxProps } from "../props/resolving.js"
import { getJsxLegacyChildren } from "./getting.js"
import { emptyLegacyJsxChildren } from "./verifying.js"

const compileJsxExpression = (type, props, maybeKey) =>
  createJsxElement(
    type,
    resolveJsxProps(props, type),
    resolveJsxPropsyKey(props, maybeKey),
    getJsxParent(getJsxInternals(globalThis["React"])),
    resolveJsxPropsRef(props),
  )

const compileLegacyJsxExpression = (type, props, ...children) =>
  emptyLegacyJsxChildren(children)?
    compileJsxExpression(type, props ?? {}):
    compileJsxExpression(type, { ...(props ?? {}), children: getJsxLegacyChildren(children) })

export const jsx = compileJsxExpression
export const jsxs = compileJsxExpression
export const createElement = compileLegacyJsxExpression


