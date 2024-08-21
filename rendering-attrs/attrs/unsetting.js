import { getValidHtmlAttrNames } from "../attr-names/getting.js"
import { removeHtmlAttr } from "./removing.js"

export const unsetHtmlAttrs = (elem, props) => getValidHtmlAttrNames(elem, props).reduce((elem, attrName) => (removeHtmlAttr(elem, attrName), elem), elem)