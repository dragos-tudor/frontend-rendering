import { appendHtmlNode } from "../nodes/appending.js"
import { createHtmlElement, createHtmlElementNS } from "./creating.js"
import { getHtmlOwnerDocument } from "./getting.js"

export const renderHtmlElement = (tagName, namespace, $parent) =>
{
  const document = getHtmlOwnerDocument($parent)
  const $elem = namespace?
    createHtmlElementNS(document, namespace, tagName):
    createHtmlElement(document, tagName)
  appendHtmlNode($elem, $parent)
  return $elem
}