import { getValidHtmlAttrNames } from "../attr-names/getting.js";
import { setHtmlAttrValue } from "../attr-values/setting.js";

export const setHtmlAttrs = (elem, props) => getValidHtmlAttrNames(elem, props).reduce((elem, attrName) => (setHtmlAttrValue(elem, attrName, props[attrName]), elem), elem)