import { flatHtmlChildren } from "./flattening.js";
import { getHtmlParentElement } from "./getting.js"
import { existsHtmlElement, existsHtmlElements } from "./verifying.js";

export const findHtmlAscendant = (elem, func) =>
  (existsHtmlElement(elem) || undefined) &&
  (func(elem) && elem ||
   findHtmlAscendant(getHtmlParentElement(elem), func))

export const findsHtmlDescendants = (elems, func, result = []) =>
  (!existsHtmlElements(elems) && result) ||
  findsHtmlDescendants(flatHtmlChildren(elems), func, [...result, ...elems.filter(func)])

export const findHtmlDescendants = (elem, func) =>
  findsHtmlDescendants([elem], func)

// conditional control [if] vs conjunctions [&&] and disjunctions [||] [above]
// export const findHtmlAscendant = (elem, func) => {
//   if (!existsHtmlElement(elem)) return undefined
//   if (func(elem)) return elem
//   return findHtmlAscendant(getHtmlParentElement(elem), func)
// }

