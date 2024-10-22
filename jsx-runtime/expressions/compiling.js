import { createJsxElement } from "../../rendering-jsx/mod.js"
import { resolveJsxPropsKey, resolveJsxPropsRef, resolveJsxProps } from "../props/resolving.js"
import { getJsxLegacyChildren, getJsxInternals, getJsxParent } from "./getting.js"
import { emptyLegacyJsxChildren } from "./verifying.js"

export const compileJsxExpression = (type, props, maybeKey) =>
  createJsxElement(
    type,
    resolveJsxProps(props, type),
    resolveJsxPropsKey(props, maybeKey),
    getJsxParent(getJsxInternals(globalThis["React"])),
    resolveJsxPropsRef(props),
  )

export const compileLegacyJsxExpression = (type, props, ...children) =>
  emptyLegacyJsxChildren(children)?
    compileJsxExpression(type, props ?? {}):
    compileJsxExpression(type, { ...(props ?? {}), children: getJsxLegacyChildren(children) })


