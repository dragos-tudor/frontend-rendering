import { getHtmlOwnerDocument } from "../elements/getting.js"
import { appendHtmlNode } from "../nodes/appending.js"
import { createHtmlText } from "./creating.js"

export const renderHtmlText = (text, $parent) =>
{
  const document = getHtmlOwnerDocument($parent)
  const $text = createHtmlText(document, text)
  return appendHtmlNode($text, $parent)
}