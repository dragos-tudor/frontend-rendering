import { getHtmlChildren, getHtmlParentElement } from "./getting.js"
import { existsHtmlElement } from "./verifying.js";

export const findHtmlAscendant = (elem, func) =>
{
  if (!existsHtmlElement(elem)) return undefined
  if (func(elem)) return elem
  return findHtmlAscendant(getHtmlParentElement(elem), func)
}

export const findHtmlDescendants = (elem, func, result = []) =>
{
  if (!existsHtmlElement(elem)) return result
  if (func(elem)) result.push(elem)
  for (const child of getHtmlChildren(elem))
    findHtmlDescendants(child, func, result)
  return result
}

// conditional control [if] vs conjunctions [&&] and disjunctions [||] [below]
// export const findHtmlAscendant = (elem, func) =>
//   (existsHtmlElement(elem) || undefined) &&
//   (func(elem) && elem ||
//    findHtmlAscendant(getHtmlParentElement(elem), func))

