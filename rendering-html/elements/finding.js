import { getHtmlChildren, getHtmlParentElement } from "./getting.js"
import { findBreadthHtmlDescendants, findBreadthHtmlDescendant } from "./finding.breadth.js"
import { existsHtmlElement } from "./verifying.js"

export const findHtmlAscendant = (elem, func) =>
{
  if (!existsHtmlElement(elem)) return undefined
  if (func(elem)) return elem
  return findHtmlAscendant(getHtmlParentElement(elem), func)
}

export const findHtmlAscendants = (elem, func, result = []) =>
{
  if(!existsHtmlElement(elem)) return []
  if (existsHtmlElement(elem)) result.push(elem)
  if (func(elem)) return result
  return findHtmlAscendants(getHtmlParentElement(elem), func, result)
}

export const findHtmlDescendant = (elem, func, findStrategy = findBreadthHtmlDescendant) => findStrategy(getHtmlChildren(elem), func)

export const findHtmlDescendants = (elem, func, result = [], findStrategy = findBreadthHtmlDescendants) => findStrategy(getHtmlChildren(elem), func, result)