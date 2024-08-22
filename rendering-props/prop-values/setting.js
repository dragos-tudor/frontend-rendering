import { mapHtmlPropName } from "../prop-maps/mapping.js"
import { isInternalHtmlPropName, isStyleHtmlPropName } from "../prop-names/verifying.js"
import { isWritableHtmlProp } from "../props/verifying.js"
import { resolveHtmlPropValue } from "./resolving.js"


const setPropValue = (elem, propName, propValue) => elem[propName] = propValue

const setStyleHtmlPropValues = (elem, style) => Object.assign(elem.style, style)

export const setHtmlPropValue = (elem, propName, propValue) =>
{
  if (isStyleHtmlPropName(propName)) return setStyleHtmlPropValues(elem, propValue)
  if (isInternalHtmlPropName(propName)) return setPropValue(elem, propName, propValue)
  if (!isWritableHtmlProp(elem, propName)) return

  setPropValue(elem, mapHtmlPropName(propName), resolveHtmlPropValue(elem, propName, propValue))
  return propValue
}