import { mapHtmlPropName } from "../props-names/mapping.js";
import { isDangerouslyHtmlPropName, isToggleHtmlPropName } from "../props-names/verifying.js"
import { encodeHtml } from "../security/encoding.js"
import { getToggleHtmlPropValue } from "./getting.js"

export const resolveHtmlPropValue = (props, propName) =>
  (isDangerouslyHtmlPropName(propName) && encodeHtml(props[propName])) ||
  (isToggleHtmlPropName(mapHtmlPropName(propName)) && getToggleHtmlPropValue(props[propName])) ||
  props[propName]
