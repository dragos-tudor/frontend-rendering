import { encodeHtml } from "../security/encoding.js"
import { getTogglePropValue } from "./getting.js"
import { isDangerouslyHtmlPropName, isTogglePropName } from "./verifying.js"

export const resolvePropValue = (props, propName) =>
  (isDangerouslyHtmlPropName(propName) && encodeHtml(props[propName])) ||
  (isTogglePropName(propName, props[propName]) && getTogglePropValue(props[propName])) ||
  props[propName]
