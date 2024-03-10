import { setAttribute } from "../attributes/setting.js"
import { getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { resolvePropValue } from "../props-values/resolving.js"
import { isHtmlPropName, isWritableHtmlProp } from "./verifying.js"

const setHtmlProperty = (props) => (elem, propName) => {
  const htmlPropName = mapPropName(propName)
  const htmlPropValue = resolvePropValue(props, propName)
  isHtmlPropName(elem, htmlPropName) && isWritableHtmlProp(elem, propName)?
    (elem[htmlPropName] = htmlPropValue):
    setAttribute(elem, htmlPropName, htmlPropValue);
  return elem
}

export const setHtmlProperties = (elem, props) =>
  getValidPropNames(elem, props).reduce(setHtmlProperty(props), elem)