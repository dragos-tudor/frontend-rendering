import { getHtmlChildNodes } from "../../rendering-html/mod.js";
import { buildJsxFactoryChildren, isJsxElement, isJsxFactory, isJsxKeyElement, sanitizeJsxChildren } from "../../rendering-jsx/mod.js";
import { orderElementKeys, existsElement } from "../../rendering-elements/mod.js"

export const resolveJsxChildren = (elem, $elem) =>
  (isJsxFactory(elem) && buildJsxFactoryChildren(elem, $elem)) ||
  (isJsxElement(elem) && sanitizeJsxChildren(elem)) ||
  []

export const resolveHtmlChildren = ($elem, children) =>
  existsElement(children[0]) && isJsxKeyElement(children[0])?
    orderElementKeys(children, getHtmlChildNodes($elem), $elem):
    getHtmlChildNodes($elem)