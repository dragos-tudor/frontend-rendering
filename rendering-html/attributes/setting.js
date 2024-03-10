import { isFunctionAttrValue, isNamespaceAttrName } from "./veifying.js"

export const setAttribute = (elem, attrName, attrValue) =>
  isFunctionAttrValue(attrValue) ||
  isNamespaceAttrName(attrName) ||
  elem.setAttributeNS?.(null, attrName, attrValue)