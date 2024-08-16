import { isFunctionAttrValue, isXmlnsAttrName } from "./verifying.js"

const setAttrValue = (elem, attrName, attrValue) => elem.setAttributeNS?.(null, attrName, attrValue)

export const setAttr = (elem, attrName, attrValue) =>
{
  if (isFunctionAttrValue(attrValue)) return
  if (isXmlnsAttrName(attrName)) return
  setAttrValue(elem, attrName, attrValue)
  return attrValue
}