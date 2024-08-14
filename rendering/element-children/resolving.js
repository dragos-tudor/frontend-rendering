import { buildJsxFactoryChildren, isJsxElement, isJsxFactory, sanitizeJsxChildren } from "../../rendering-jsx/mod.js"

export const resolveJsxChildren = (elem, $elem) =>
  (isJsxFactory(elem) && buildJsxFactoryChildren(elem, $elem)) ||
  (isJsxElement(elem) && sanitizeJsxChildren(elem)) ||
  []