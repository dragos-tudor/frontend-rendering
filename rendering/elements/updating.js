import { setHtmlEventHandlers } from "../../rendering-events/mod.js";
import { getHtmlName, updateHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxProps, isJsxText, storeJsxElement, validateJsxElement } from "../../rendering-jsx/mod.js"
import { setHtmlProps } from "../../rendering-props/mod.js"
import { throwError } from "../errors/throwing.js"
import { logElementOrText } from "./logging.js"

export const updateElement = (elem, $elem) =>
{
  logElementOrText($elem, "update")
  if (isJsxText(elem)) return updateHtmlText(elem, $elem)

  throwError(validateHtmlElement($elem))
  throwError(validateJsxElement(elem))

  const props = getJsxProps(elem)
  const tagName = getHtmlName($elem)

  setHtmlProps($elem, props, tagName)
  setHtmlEventHandlers($elem, props)
  storeJsxElement($elem, elem)
  return $elem
}
