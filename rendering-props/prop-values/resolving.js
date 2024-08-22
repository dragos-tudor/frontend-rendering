import { isToggleHtmlPropName } from "../prop-names/verifying.js"
import { encodeHtml } from "../prop-security/encoding.js"
import { isDangerouslyHtmlPropName, isUnsafeHtmlCssPropName } from "../prop-security/verifying.js"
import { getToggleHtmlPropValue, NeutralCSSPropValue } from "./getting.js"

export const resolveHtmlPropValue = (elem, propName, propValue) =>
  (isToggleHtmlPropName(propName) && getToggleHtmlPropValue(propValue)) ||
  (isUnsafeHtmlCssPropName(elem, propName) && NeutralCSSPropValue) ||
  (isDangerouslyHtmlPropName(propName) && encodeHtml(propValue)) ||
  propValue
