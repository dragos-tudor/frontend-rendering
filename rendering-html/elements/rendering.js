import { appendHtmlNode } from "../nodes/appending.js"
import { createHtmlElement, createHtmlElementNS } from "./creating.js"
import { getHtmlOwnerDocument } from "./getting.js"
import { setHtmlElement } from "./setting.js"

export const renderHtmlElement = (tagName, namespace, props, $parent) =>
{
  const document = getHtmlOwnerDocument($parent)
  const $elem = namespace?
    createHtmlElementNS(document, namespace, tagName):
    createHtmlElement(document, tagName)

  setHtmlElement($elem, props)
  appendHtmlNode($elem, $parent)
  return $elem
}