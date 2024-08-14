import { isHtmlText, replaceHtmlElement, replaceHtmlText } from "../../rendering-html/mod.js"
import { logElementOrText } from "./logging.js"

export const replaceElement = ($elem, $oldElem) =>
{
  logElementOrText($oldElem, "replace")
  if (isHtmlText($oldElem)) return replaceHtmlText($elem, $oldElem)

  replaceHtmlElement($elem, $oldElem)
  return $elem
}
