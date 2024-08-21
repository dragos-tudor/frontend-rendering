import { isFunctionHtmlAttrValue, isXmlnsHtmlAttrName } from "./verifying.js"

const setHtmlAttrNSValue = (elem, attrName, attrValue) => elem.setAttributeNS?.(null, attrName, attrValue)

export const setHtmlAttrValue = (elem, attrName, attrValue) =>
{
  if (isFunctionHtmlAttrValue(attrValue)) return
  if (isXmlnsHtmlAttrName(attrName)) return
  setHtmlAttrNSValue(elem, attrName, attrValue)
  return attrValue
}