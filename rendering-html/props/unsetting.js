import { removeAttribute } from "../attributes/removing.js"
import { getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { isHtmlPropName, isWritableHtmlProp } from "./verifying.js"

const unsetHtmlProperty = (elem, propName) => {
  const htmlPropName = mapPropName(propName)
  isHtmlPropName(elem, htmlPropName) && isWritableHtmlProp(elem, propName)?
    (elem[htmlPropName] = undefined):
    removeAttribute(elem, htmlPropName)
  return elem
}

export const unsetHtmlProperties = (elem, props) =>
  getValidPropNames(elem, props).reduce(unsetHtmlProperty, elem)