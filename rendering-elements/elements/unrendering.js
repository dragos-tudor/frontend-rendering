import { removeHtmlNode, getHtmlParentElement } from "../../rendering-html/mod.js"
import { unstoreInternals } from "../internals/unstoring.js"
import { unsetHtmlElement } from "./unsetting.js"

export const unrenderHtmlElement = ($elem) => {
  unsetHtmlElement($elem)
  unstoreInternals($elem)
  return getHtmlParentElement($elem)? removeHtmlNode($elem): $elem
}