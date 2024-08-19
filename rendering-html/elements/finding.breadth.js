import { getHtmlChildren } from "./getting.js"

export const findBreadthHtmlDescendant = (elems, func) =>
{
  for (const elem of elems)
    if (func(elem)) return elem
  for (const elem of elems) {
    const descendant = findBreadthHtmlDescendant(getHtmlChildren(elem), func)
    if (descendant) return descendant
  }
}

export const findBreadthHtmlDescendants = (elems, func, result = []) =>
{
  for (const elem of elems)
    if (func(elem)) result.push(elem)
  for (const elem of elems)
    findBreadthHtmlDescendants(getHtmlChildren(elem), func, result)
  return result
}