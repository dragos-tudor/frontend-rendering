import { isHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement } from "../../rendering-jsx/mod.js"
import { handleError } from "../errors/handling.js"
import { orderHtmlChildren } from "../element-children/ordering.js"
import { resolveJsxChildren } from "../element-children/resolving.js"
import { reconcileElement } from "../elements/reconciliating.js"
import { getMaxLengthElements } from "../elements/getting.js"
import { shouldSkipElement } from "../elements/verifying.js"
import { updateElement } from "../elements/updating.js"

export const updateElementTree = ($elem, elem = getJsxElement($elem)) =>
{
  const updated = [updateElement(elem, $elem)]
  for(const $elem of updated) {
    if (shouldSkipElement($elem)) continue
    const children = handleError(() => resolveJsxChildren(getJsxElement($elem), $elem), $elem)
    const $children = orderHtmlChildren($elem, children)

    getMaxLengthElements(children, $children).forEach((_, index) => {
      const $reconciled = reconcileElement(children[index], $children[index], $elem)
      if (isHtmlElement($reconciled)) updated.push($reconciled)
    })
  }
  return updated
}