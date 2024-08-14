import { isFunctionAttrValue, isXmlnsAttrName } from "./veifying.js"

const setAttributeNS = (elem, attrName, attrValue) => elem.setAttributeNS?.(null, attrName, attrValue)

export const setAttribute = (elem, attrName, attrValue) =>
  isFunctionAttrValue(attrValue) ||
  isXmlnsAttrName(attrName) ||
  setAttributeNS(elem, attrName, attrValue)