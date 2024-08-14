import { renderHtmlElement, renderHtmlText, validateHtmlElement, validateHtmlTagName } from "../../rendering-html/mod.js"
import { getJsxName, getJsxProps, isJsxText, storeJsxElement, validateJsxElement } from "../../rendering-jsx/mod.js"
import { throwError } from "../errors/throwing.js"
import { enableIgnoring } from "../ignores/enabling.js";
import { enableLogging } from "../loggers/enabling.js";
import { getHtmlElementNS, getJsxElementNS } from "./getting.js"
import { logElementOrText } from "./logging.js"

export const renderElement = (elem, $parent) =>
{
  if (isJsxText(elem)) return renderHtmlText(elem, $parent)

  throwError(validateHtmlElement($parent))
  throwError(validateJsxElement(elem))
  throwError(validateHtmlTagName(getJsxName(elem)))

  const namespace = getJsxElementNS(elem) || getHtmlElementNS($parent)
  const props = getJsxProps(elem)
  const tagName = getJsxName(elem)

  const $elem = renderHtmlElement(tagName, namespace, props, $parent)
  enableIgnoring($elem, $parent)
  enableLogging($elem, $parent)
  storeJsxElement($elem, elem)
  logElementOrText($elem, "render")
  return $elem
}
