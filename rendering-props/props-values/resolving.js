import { isDangerouslyHtmlPropName, isToggleHtmlPropName } from "../props-names/verifying.js"
import { encodeHtml } from "../security/encoding.js"
import { getToggleHtmlPropValue } from "./getting.js"

export const resolveHtmlPropValue = (propName, propValue) =>
  (isToggleHtmlPropName(propName) && getToggleHtmlPropValue(propValue)) ||
  (isDangerouslyHtmlPropName(propName) && encodeHtml(propValue)) ||
  propValue
