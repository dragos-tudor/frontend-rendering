import { existsHtmlElement } from "../../rendering-html/mod.js"
import { existsJsxElement, isJsxElement, isJsxFactory, isJsxText } from "../../rendering-jsx/mod.js"
import { equalElementNames, equalElementProps, equalTexts, existsNoSkipElementProp } from "../elements/verifying.js"

export const ReconcilingTypes = Object.freeze({
  render: 0, update: 1, replace: 2, unrender: 3, skip: 4
})

export const getReconcilingType = (elem, $elem) =>
{
  if (!existsHtmlElement($elem)) return ReconcilingTypes.render
  if (!existsJsxElement(elem)) return ReconcilingTypes.unrender
  if (!equalElementNames(elem, $elem)) return ReconcilingTypes.replace
  if (isJsxElement(elem)) return ReconcilingTypes.update
  if (isJsxFactory(elem) && !equalElementProps(elem, $elem)) return ReconcilingTypes.update
  if (isJsxFactory(elem) && existsNoSkipElementProp(elem)) return ReconcilingTypes.update
  if (isJsxText(elem) && !equalTexts(elem, $elem)) return ReconcilingTypes.update
  return ReconcilingTypes.skip
}