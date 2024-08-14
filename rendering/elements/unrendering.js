import { isHtmlText, unrenderHtmlElement, unrenderHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { getEffects, runInitialEffects } from "../../rendering-effects/mod.js"
import { throwError } from "../errors/throwing.js"
import { logElementOrText } from "./logging.js"
import { getJsxElement, getJsxProps, unstoreJsxElement } from "../../rendering-jsx/mod.js";

export const unrenderElement = ($elem) =>
{
  logElementOrText($elem, "unrender")
  if (isHtmlText($elem)) return unrenderHtmlText($elem)

  throwError(validateHtmlElement($elem))
  runInitialEffects(getEffects($elem))
  unrenderHtmlElement($elem, getJsxProps(getJsxElement($elem)))
  unstoreJsxElement($elem)
  return $elem
}
