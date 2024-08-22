import { mapHtmlPropName } from "../prop-maps/mapping.js"
import { getHtmlPropNames } from "../prop-names/getting.js"
import { isInternalHtmlPropName, isStyleHtmlPropName } from "../prop-names/verifying.js"
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