import { getHtmlPropNames } from "../props-names/getting.js"
import { mapHtmlPropName } from "../props-names/mapping.js"
import { isInternalHtmlPropName, isStyleHtmlPropName } from "../props-names/verifying.js"
import { isWritableHtmlProp } from "../props/verifying.js"
import { resolveHtmlPropValue } from "./resolving.js"


const setPropValue = (elem, propName, propValue) => elem[propName] = propValue

const setStyleHtmlPropValue = (style) => (elem, styleName) => (elem.style[styleName] = style[styleName], styleName)

const setStyleHtmlPropValues = (elem, style) => getHtmlPropNames(style).reduce(setStyleHtmlPropValue(style), elem)

export const setHtmlPropValue = (elem, propName, propValue) =>
{
  if (isStyleHtmlPropName(propName)) return setStyleHtmlPropValues(elem, propValue)
  if (isInternalHtmlPropName(propName)) return setPropValue(elem, propName, propValue)
  if (!isWritableHtmlProp(elem, propName)) return

  setPropValue(elem, mapHtmlPropName(propName), resolveHtmlPropValue(propName, propValue))
  return propValue
}