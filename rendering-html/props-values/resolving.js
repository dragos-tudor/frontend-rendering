import { isDangerouslyPropName, isTogglePropName } from "../props-names/verifying.js"
import { encodeHtml } from "../security/encoding.js"
import { getTogglePropValue } from "./getting.js"

export const resolvePropValue = (props, propName) =>
  (isDangerouslyPropName(propName) && encodeHtml(props[propName])) ||
  (isTogglePropName(propName, props[propName]) && getTogglePropValue(props[propName])) ||
  props[propName]
