import { getJsxElement } from "../../rendering-jsx/mod.js"
import { getMaxLengthElements } from "../elements/getting.js";
import { reconcileElement } from "../elements/reconciling.js"
import { orderHtmlChildren } from "./ordering.js"
import { resolveJsxChildren } from "./resolving.js"

export const updateElementChildren = ($elem) =>
{
  const children = resolveJsxChildren(getJsxElement($elem), $elem)
  const $children = orderHtmlChildren($elem, children)

  return getMaxLengthElements(children, $children).flatMap ((_, index) =>
    reconcileElement(children[index], $children[index], $elem))
}