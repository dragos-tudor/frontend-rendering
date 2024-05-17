import { appendHtmlNode, createHtmlElement, createHtmlElementNS, getHtmlOwnerDocument, validateHtmlTagName } from "../../rendering-html/mod.js"
import { getJsxName } from "../../rendering-jsx/mod.js"
import { throwError } from "../errors/throwing.js"
import { enableIgnoring } from "../ignores/enabling.js"
import { storeInternals } from "../internals/storing.js"
import { enableLogging } from "../loggers/enabling.js"
import { getElementNS, getHtmlElementNS } from "./getting.js"
import { setHtmlElement } from "./setting.js"

export const renderHtmlElement = (elem, $parent) =>
{
  throwError(validateHtmlTagName(getJsxName(elem)))
  const document = getHtmlOwnerDocument($parent)
  const ns = getElementNS(elem) || getHtmlElementNS($parent)

  const $elem = ns?
    createHtmlElementNS(document, ns, getJsxName(elem)):
    createHtmlElement(document, getJsxName(elem))
  setHtmlElement($elem, elem)
  appendHtmlNode($elem, $parent)

  enableIgnoring($elem, $parent)
  enableLogging($elem, $parent)
  storeInternals($elem, elem)

  return $elem
}