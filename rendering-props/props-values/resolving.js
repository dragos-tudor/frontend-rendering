import { mapPropName } from "../props-names/mapping.js";
import { isDangerouslyPropName, isTogglePropName } from "../props-names/verifying.js"
import { encodeHtml } from "../security/encoding.js"
import { getTogglePropValue } from "./getting.js"

export const resolvePropValue = (props, propName) =>
  (isDangerouslyPropName(propName) && encodeHtml(props[propName])) ||
  (isTogglePropName(mapPropName(propName)) && getTogglePropValue(props[propName])) ||
  props[propName]
