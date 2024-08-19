import { getHtmlChildren, getHtmlParentElement } from "./getting.js"
import { findBreadthHtmlDescendants, findBreadthHtmlDescendant } from "./finding.breadth.js"
import { existsHtmlElement } from "./verifying.js"

export const findHtmlAscendant = (elem, func) =>
{
  if (!existsHtmlElement(elem)) return undefined
  if (func(elem)) return elem
  return findHtmlAscendant(getHtmlParentElement(elem), func)
}

export const findHtmlDescendant = (elem, func, findStrategy = findBreadthHtmlDescendant) => findStrategy(getHtmlChildren(elem), func)

export const findHtmlDescendants = (elem, func, result = [], findStrategy = findBreadthHtmlDescendants) => findStrategy(getHtmlChildren(elem), func, result)