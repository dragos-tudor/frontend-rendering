import { setEventHandlers } from "../../rendering-events/mod.js";
import { getHtmlName, updateHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxProps, isJsxText, storeJsxElement, validateJsxElement } from "../../rendering-jsx/mod.js"
import { setProps } from "../../rendering-props/mod.js"
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

  setProps($elem, props, tagName)
  setEventHandlers($elem, props)
  storeJsxElement($elem, elem)
  return $elem
}
