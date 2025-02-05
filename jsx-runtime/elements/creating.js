import { resolveJsxChildren } from "../children/resolving.js"
import { getJsxInternals, getJsxParent } from "../internals/getting.js"
import { deleteJsxPropsKeyAndRef } from "../props/deleting.js"
import { getJsxPropsKey, getJsxPropsRef } from "../props/getting.js"
import { setJsxDefaultProps } from "../props/setting.js"
import { JsxElementType } from "./types.js"

export const createJsxElement = (type, props, maybeKey = null) =>
  Object.freeze({
    $$typeof: JsxElementType,
    type,
    key: maybeKey ?? getJsxPropsKey(props),
    ref: getJsxPropsRef(props),
    props: deleteJsxPropsKeyAndRef(setJsxDefaultProps(type, props)),
    _owner: getJsxParent(getJsxInternals(globalThis["React"])),
  })

export const createLegacyJsxElement = (type, props, ...children) =>
  Object.freeze({
    $$typeof: JsxElementType,
    type,
    key: getJsxPropsKey(props),
    ref: getJsxPropsRef(props),
    props: { ...deleteJsxPropsKeyAndRef(setJsxDefaultProps(props)), children: resolveJsxChildren(children)},
    _owner: getJsxParent(getJsxInternals(globalThis["React"])),
  })