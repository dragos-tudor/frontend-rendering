import { getValidEventHandlerNames, setEventHandlers } from "../../rendering-events/mod.js"
import { renderHtmlElement, renderHtmlText, validateHtmlElement, validateHtmlTagName } from "../../rendering-html/mod.js"
import { getJsxName, getJsxProps, isJsxText, storeJsxElement, validateJsxElement } from "../../rendering-jsx/mod.js"
import { getValidPropNames, setProps } from "../../rendering-props/mod.js"
import { throwError } from "../errors/throwing.js"
import { enableIgnoring } from "../ignores/enabling.js"
import { enableLogging } from "../loggers/enabling.js"
import { getElementNS } from "./getting.js"
import { logElementOrText } from "./logging.js"

export const renderElement = (elem, $parent) =>
{
  if (isJsxText(elem)) return renderHtmlText(elem, $parent)

  throwError(validateHtmlElement($parent))
  throwError(validateJsxElement(elem))
  throwError(validateHtmlTagName(getJsxName(elem)))

  const tagName = getJsxName(elem)
  const props = getJsxProps(elem)
  const $elem = renderHtmlElement(tagName, getElementNS(elem, $parent), $parent)

  setProps($elem, props, getValidPropNames(props, tagName))
  setEventHandlers($elem, props, getValidEventHandlerNames(props))
  enableIgnoring($elem, $parent)
  enableLogging($elem, $parent)
  storeJsxElement($elem, elem)
  logElementOrText($elem, "render")
  return $elem
}
