import { getHtmlOwnerDocument } from "../elements/getting.js"
import { insertHtmlNode } from "../nodes/inserting.js"
import { createHtmlText } from "./creating.js"

export const insertHtmlText = (text, $elem, $parent) =>
{
  const document = getHtmlOwnerDocument($parent)
  const $text = createHtmlText(document, text)
  return insertHtmlNode($text, $elem)
}