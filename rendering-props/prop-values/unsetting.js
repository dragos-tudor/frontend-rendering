import { mapHtmlPropName } from "../prop-maps/mapping.js"
import { isClassNameHtmlPropName } from "../prop-names/verifying.js"
import { isWritableHtmlProp } from "../props/verifying.js"

const unsetPropValue = (elem, propName) => elem[propName] = isClassNameHtmlPropName(propName)? "": undefined

export const unsetHtmlPropValue = (elem, propName) =>
{
  if (!isWritableHtmlProp(elem, propName)) return
  return unsetPropValue(elem, mapHtmlPropName(propName))
}