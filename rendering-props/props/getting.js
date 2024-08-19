import { isHtmlAttrName } from "../attributes/verifying.js"
import { isInternalHtmlPropName, isStyleHtmlPropName } from "../props-names/verifying.js"
import { isSVGHtmlPropValue } from "../props-values/verifying.js"
import { isWritableHtmlProp } from "./verifying.js"

export const HtmlPropTypes = Object.freeze({
  attr: 0, readonlyProp: 1, writableProp: 2, style: 3
})

export const getHtmlPropDescriptor = (elem, propName) => Object.getOwnPropertyDescriptor(elem, propName)

export const getHtmlPropType = (elem, propName) => {
  if (isInternalHtmlPropName(propName)) return HtmlPropTypes.writableProp
  if (isSVGHtmlPropValue(elem, propName)) return HtmlPropTypes.readonlyProp
  if (isStyleHtmlPropName(propName)) return HtmlPropTypes.style
  if (isHtmlAttrName(elem, propName)) return HtmlPropTypes.attr
  if (isWritableHtmlProp(elem, propName)) return HtmlPropTypes.writableProp
  return HtmlPropTypes.readonlyProp
}