import { appendHtmlNode, createHtmlText, getHtmlOwnerDocument } from "../../rendering-html/mod.js"

export const renderHtmlText = (text, $parent) => {
  const document = getHtmlOwnerDocument($parent)
  const $text = createHtmlText(document, text)
  return appendHtmlNode($text, $parent)
}