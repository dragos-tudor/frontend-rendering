import { isFunctionHtmlAttrValue } from "./verifying.js"

const setAttrValue = (elem, attrName, attrValue) => elem.setAttributeNS?.(null, attrName, attrValue)

export const setHtmlAttrValue = (elem, attrName, attrValue) =>
{
  if (isFunctionHtmlAttrValue(attrValue)) return undefined
  setAttrValue(elem, attrName, attrValue)
  return attrValue
}