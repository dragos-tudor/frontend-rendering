import { mapHtmlPropName } from "../props-names/mapping.js"
import { isWritableHtmlProp } from "../props/verifying.js";


const unsetPropValue = (elem, propName) => elem[propName] = undefined

export const unsetHtmlPropValue = (elem, propName) =>
{
  if (!isWritableHtmlProp(elem, propName)) return
  return unsetPropValue(elem, mapHtmlPropName(propName))
}