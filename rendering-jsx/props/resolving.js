import { copyDefaultJsxProps, copyValidJsxProps } from "./copying.js"
import { getJsxPropsRef, getJsxPropsKey } from "./getting.js"
import { existsJsxKey, existsJsxPropsKey, existsJsxPropsRef } from "./verifying.js"

export const resolveJsxPropsKey = (props, maybeKey) =>
  (existsJsxPropsKey(props) && getJsxPropsKey(props).toString()) ||
  (existsJsxKey(maybeKey) && maybeKey.toString()) ||
  null

export const resolveJsxPropsRef = (props) =>
  (existsJsxPropsRef(props) && getJsxPropsRef(props)) ||
  null

export const resolveJsxProps = (initialProps, type) =>
  (type && type.defaultProps)?
    copyDefaultJsxProps(type.defaultProps, copyValidJsxProps(initialProps)):
    copyValidJsxProps(initialProps)