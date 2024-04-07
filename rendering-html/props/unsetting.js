import { removeAttribute } from "../attributes/removing.js"
import { getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { isInternalPropName, isStylePropName } from "../props-names/verifying.js"
import { isHtmlProperty, isHtmlWritableProperty } from "./verifying.js"

const unsetHtmlProperty = (elem, propName) =>
{
  if(isStylePropName(propName)) return elem

  const htmlPropName = mapPropName(propName);
  (isHtmlProperty(elem, htmlPropName) || isInternalPropName(htmlPropName)) &&
  isHtmlWritableProperty(elem, propName)?
    unsetHtmlPropertyValue(elem, htmlPropName):
    removeAttribute(elem, htmlPropName)
  return elem
}

const unsetHtmlPropertyValue = (elem, propName) =>
  elem[propName] = undefined

export const unsetHtmlProperties = (elem, props) =>
  getValidPropNames(elem, props).reduce(unsetHtmlProperty, elem)