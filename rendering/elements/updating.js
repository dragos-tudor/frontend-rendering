import { getEffects, runInitialEffects } from "../../rendering-effects/mod.js";
import { updateHtmlElement, updateHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxProps, isJsxText, storeJsxElement, validateJsxElement } from "../../rendering-jsx/mod.js"
import { throwError } from "../errors/throwing.js"
import { logElementOrText } from "./logging.js"

export const updateElement = (elem, $elem) =>
{
  logElementOrText($elem, "update")
  if (isJsxText(elem)) return updateHtmlText(elem, $elem)

  throwError(validateHtmlElement($elem))
  throwError(validateJsxElement(elem))
  runInitialEffects(getEffects($elem))
  updateHtmlElement($elem, getJsxProps(elem))
  storeJsxElement($elem, elem)
  return $elem
}
