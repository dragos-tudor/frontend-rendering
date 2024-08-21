import { isValidHtmlAttrName } from "./verifying.js";

export const getHtmlAttrNames = (attrs) => Object.getOwnPropertyNames(attrs)

export const getValidHtmlAttrNames = (elem, attrs) => getHtmlAttrNames(attrs).filter(attrName => isValidHtmlAttrName(elem, attrName))