import { setHtmlAttrs } from "../../rendering-attrs/mod.js"
import { setHtmlEventHandlers } from "../../rendering-events/mod.js"
import { renderHtmlElement, renderHtmlText, validateHtmlElement, validateHtmlTagName } from "../../rendering-html/mod.js"
import { getJsxName, getJsxProps, isJsxText, storeJsxElement, validateJsxElement } from "../../rendering-jsx/mod.js"
import { setHtmlProps } from "../../rendering-props/mod.js"
import { throwError } from "../errors/throwing.js"
import { enableIgnoring } from "../ignores/enabling.js"
import { enableLogging } from "../loggers/enabling.js"
import { getElementNS } from "./getting.js"
import { logElement, logText } from "./logging.js"

export const renderElement = (elem, $parent) =>
{
  if (isJsxText(elem)) {
    const $text = renderHtmlText(elem, $parent)
    logText($text, "render")
    return $text
  }

  throwError(validateHtmlElement($parent))
  throwError(validateHtmlTagName(getJsxName(elem)))
  throwError(validateJsxElement(elem))
  const props = getJsxProps(elem)
  const $elem = renderHtmlElement(getJsxName(elem), getElementNS(elem, $parent), $parent)

  setHtmlAttrs($elem, props)
  setHtmlProps($elem, props)
  setHtmlEventHandlers($elem, props)
  enableIgnoring($elem, $parent)
  enableLogging($elem, $parent)
  storeJsxElement($elem, elem)
  logElement($elem, "render")
  return $elem
}
