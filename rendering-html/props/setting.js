import { setAttribute } from "../attributes/setting.js"
import { getPropNames, getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { isInternalPropName, isStylePropName } from "../props-names/verifying.js"
import { resolvePropValue } from "../props-values/resolving.js"
import { isHtmlProperty, isHtmlWritableProperty } from "./verifying.js"

const setHtmlProperty = (props) => (elem, propName) =>
{
  if(isStylePropName(propName)) {
    setHtmlStyleProperties(elem, props[propName])
    return elem
  }

  const htmlPropName = mapPropName(propName)
  const htmlPropValue = resolvePropValue(props, propName);
  (isHtmlProperty(elem, htmlPropName) || isInternalPropName(htmlPropName)) &&
  isHtmlWritableProperty(elem, propName)?
    setHtmlPropertyValue(elem, htmlPropName, htmlPropValue):
    setAttribute(elem, htmlPropName, htmlPropValue);
  return elem
}

const setHtmlPropertyValue = (elem, propName, propValue) =>
  elem[propName] = propValue

const setHtmlStyleProperty = (style) => (elem, styleName) =>
  (elem.style[styleName] = style[styleName], styleName)

const setHtmlStyleProperties = (elem, style) =>
  getPropNames(style).reduce(setHtmlStyleProperty(style), elem)

export const setHtmlProperties = (elem, props) =>
  getValidPropNames(elem, props).reduce(setHtmlProperty(props), elem)



