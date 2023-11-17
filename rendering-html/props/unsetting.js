import { getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { isHtmlPropName } from "./verifying.js"

const unsetHtmlProperty = (elem, propName) => {
  const htmlPropName = mapPropName(propName)
  if(isHtmlPropName(elem, htmlPropName))
    elem[htmlPropName] = undefined
  return elem
}

export const unsetHtmlProperties = (elem, props) => getValidPropNames(elem, props).reduce(unsetHtmlProperty, elem)