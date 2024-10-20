import { existsHtmlElement } from "../../rendering-html/mod.js"
import { existsJsxElement, isJsxElement, isJsxFactory, isJsxText } from "../../rendering-jsx/mod.js"
import { equalElementNames, equalElementProps, equalTexts, existsNoSkipElementProp } from "../elements/verifying.js"

export const isRenderReconciliation = (elem, $elem) => existsJsxElement(elem) && !existsHtmlElement($elem)

export const isUnrenderReconciliation = (elem, $elem) => existsHtmlElement($elem) && !existsJsxElement(elem)

export const isReplaceReconciliation = (elem, $elem) => !equalElementNames(elem, $elem)

export const isUpdateReconciliation = (elem, $elem) =>
{
  if (isJsxElement(elem)) return true
  if (isJsxFactory(elem) && !equalElementProps(elem, $elem)) return true
  if (isJsxFactory(elem) && existsNoSkipElementProp(elem)) return true
  if (isJsxText(elem) && !equalTexts(elem, $elem)) return true
  return false;
}