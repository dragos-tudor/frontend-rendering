import { update } from "../../rendering/mod.js"
import { findHtmlAscendant } from "../../rendering-html/mod.js"
import { getJsxElement } from "../../rendering-jsx/mod.js"
import { Suspense } from "./Suspense.js"
import { isSuspenseElement } from "./verifying.js"

const toggleSuspense = (elem, suspending) => {
  const $suspense = findHtmlAscendant(elem, isSuspenseElement)
  if(!$suspense) return elem

  const {props} = getJsxElement($suspense)
  return update($suspense, <Suspense suspending={suspending} fallback={props.fallback}>{props.children}</Suspense>)
}

export const suspense = (elem) => toggleSuspense(elem, true)

export const unsuspense = (elem) => toggleSuspense(elem, false)