import { getHtmlParentElement } from "./getting.js"
import { iterateHtmlChildren } from "./iterating.js"

export const findHtmlAscendant = (elem, func) => {
  if(func(elem)) return elem
  if(!getHtmlParentElement(elem)) return undefined
  return findHtmlAscendant(getHtmlParentElement(elem), func)
}

export const findHtmlDescendants = (elem, func, elems = []) => {
  if(func(elem)) elems.push(elem)
  iterateHtmlChildren(elem, child => findHtmlDescendants(child, func, elems))
  return elems
}
