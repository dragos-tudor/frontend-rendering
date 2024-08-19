import { getHtmlChildren } from "./getting.js"

export const findDeepHtmlDescendant = (elems, func) =>
{
  for (const elem of elems) {
    if (func(elem)) return elem
    const descendant = findDeepHtmlDescendant(getHtmlChildren(elem), func)
    if (descendant) return descendant
  }
}

export const findDeepHtmlDescendants = (elems, func, result = []) =>
{
  for (const elem of elems) {
    if (func(elem)) result.push(elem)
    findDeepHtmlDescendants(getHtmlChildren(elem), func, result)
  }
  return result
}