import { removeHtmlNode, getHtmlParentElement } from "../../rendering-html/mod.js"
import { unsetHtmlElement } from "./unsetting.js"

export const unrenderHtmlElement = ($elem, props) =>
{
  unsetHtmlElement($elem, props)
  return getHtmlParentElement($elem)? removeHtmlNode($elem): $elem
}