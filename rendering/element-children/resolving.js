import { buildJsxFactoryChildren, isJsxElement, isJsxFactory, sanitizeJsxChildren } from "../../rendering-jsx/mod.js"
import { handleError } from "../errors/handling.js"

export const resolveJsxChildren = (elem, $elem) =>
  (isJsxFactory(elem) && handleError(() => buildJsxFactoryChildren(elem, $elem), $elem)) ||
  (isJsxElement(elem) && sanitizeJsxChildren(elem)) ||
  []