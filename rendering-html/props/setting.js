import { getValidPropNames } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { resolvePropValue } from "../props-values/resolving.js"
import { isHtmlPropName } from "./verifying.js"

const setHtmlProperty = (props) => (elem, propName) => {
  const htmlPropName = mapPropName(propName)
  if(isHtmlPropName(elem, htmlPropName))
    elem[htmlPropName] = resolvePropValue(props, propName)
  return elem
}

export const setHtmlProperties = (elem, props) =>
  getValidPropNames(elem, props).reduce(setHtmlProperty(props), elem)