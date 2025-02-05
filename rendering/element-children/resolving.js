import { buildJsxFactoryChildren, isJsxElement, isJsxFactory, sanitizeJsxElements, toJsxPropsChildrenArray } from "../../rendering-jsx/mod.js"
import { handleError } from "../errors/handling.js"

export const resolveJsxChildren = (elem, $elem) =>
  (isJsxFactory(elem) && handleError(() => buildJsxFactoryChildren(elem, $elem), $elem)) ||
  (isJsxElement(elem) && sanitizeJsxElements(toJsxPropsChildrenArray(elem.props))) ||
  []