import { isHtmlText } from "../../rendering-html/mod.js"
import { replaceHtmlElement, replaceHtmlText } from "../../rendering-elements/mod.js"
import { logElement } from "./logging.js"

export const replaceElement = ($elem, $oldElem) => (
  logElement($oldElem, "replace"),
  isHtmlText($oldElem)? replaceHtmlText($elem, $oldElem): replaceHtmlElement($elem, $oldElem),
  $elem)
