import { isHtmlElement, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement, validateJsxElement, isJsxText } from "../../rendering-jsx/mod.js"
import { updateHtmlElement, updateHtmlText, throwError } from "../../rendering-elements/mod.js"
import { handleError } from "../../rendering-elements/errors/handling.js"
import { resolveHtmlChildren, resolveJsxChildren } from "./resolving.js"
import { getMaxLengthElements } from "./getting.js"
import { logElement } from "./logging.js"
import { reconcileElement } from "./reconciliating.js"
import { shouldSkipElement } from "./verifying.js"

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
    if(shouldSkipElement($elem)) continue
    const children = handleError(() => resolveJsxChildren(getJsxElement($elem), $elem), $elem)
    const $children = resolveHtmlChildren($elem, children)

    getMaxLengthElements(children, $children)
      .map((_, index) => reconcileElement(children[index], $children[index], $elem))
      .filter($elem => isHtmlElement($elem))
      .forEach($elem => updated.push($elem))
  }

  return updated
}