import { createHtmlText, getHtmlOwnerDocument, insertHtmlNode } from "../../rendering-html/mod.js"

export const insertHtmlText = (text, $elem, $parent) => {
  const document = getHtmlOwnerDocument($parent)
  const $text = createHtmlText(document, text)
  return insertHtmlNode($text, $elem)
}