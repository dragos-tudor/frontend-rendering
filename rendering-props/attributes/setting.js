import { isFunctionHtmlAttrValue, isXmlnsHtmlAttrName } from "./verifying.js"

const setHtmlAttrValue = (elem, attrName, attrValue) => elem.setAttributeNS?.(null, attrName, attrValue)

export const setHtmlAttr = (elem, attrName, attrValue) =>
{
  if (isFunctionHtmlAttrValue(attrValue)) return
  if (isXmlnsHtmlAttrName(attrName)) return
  setHtmlAttrValue(elem, attrName, attrValue)
  return attrValue
}