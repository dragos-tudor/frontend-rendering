import { isHtmlText } from "../../rendering-html/mod.js"
import { logElement, replaceHtmlElement, replaceHtmlText } from "../../rendering-elements/mod.js"

export const replaceElement = ($elem, $oldElem) => (
  logElement($oldElem, "replace"),
  isHtmlText($oldElem)? replaceHtmlText($elem, $oldElem): replaceHtmlElement($elem, $oldElem),
  $elem)
