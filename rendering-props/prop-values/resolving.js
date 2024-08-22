import { isToggleHtmlPropName } from "../prop-names/verifying.js"
import { encodeHtml } from "../prop-security/encoding.js"
import { isDangerouslyHtmlPropName } from "../prop-security/verifying.js"
import { getToggleHtmlPropValue } from "./getting.js"

export const resolveHtmlPropValue = (propName, propValue) =>
  (isToggleHtmlPropName(propName) && getToggleHtmlPropValue(propValue)) ||
  (isDangerouslyHtmlPropName(propName) && encodeHtml(propValue)) ||
  propValue
