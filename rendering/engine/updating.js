import { throwError } from "../../support-errors/mod.js"
import { validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement, validateJsxElement, isJsxText } from "../../rendering-jsx/mod.js"
import { logElement, updateHtmlElement, updateHtmlText } from "../../rendering-elements/mod.js"
import { handleError } from "../../support-errors/errors/handling.js"
import { resolveHtmlChildren, resolveJsxChildren } from "./resolving.js"
import { getMaxLengthElements } from "./getting.js"
import { reconcileElement } from "./reconciliating.js"
import { shouldRenderChildren, isUpdatedElement } from "./verifying.js"

export const updateElement = (elem, $elem) => (
  logElement($elem, "update"), (
    isJsxText(elem)?
      updateHtmlText:
      updateHtmlElement)
    (elem, $elem))

export const updateElements = ($elem, elem = getJsxElement($elem)) => {
  isJsxText(elem) || throwError(validateHtmlElement($elem))
  isJsxText(elem) || throwError(validateJsxElement(elem))
  const updated = [updateElement(elem, $elem)]

  for(const $elem of updated) {
    if(!shouldRenderChildren($elem)) continue
    const children = handleError(() => resolveJsxChildren(getJsxElement($elem), $elem), $elem)
    const $children = resolveHtmlChildren($elem, children)

    getMaxLengthElements(children, $children)
      .map((_, index) => reconcileElement(children[index], $children[index], $elem))
      .filter($elem => isUpdatedElement($elem))
      .forEach($elem => updated.push($elem))
  }

  return updated
}