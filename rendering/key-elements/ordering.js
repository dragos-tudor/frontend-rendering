import { getHtmlChildNode, getHtmlChildNodes } from "../../rendering-html/mod.js"
import { findKeyElements } from "./finding.js"
import { moveKeyElement } from "./moving.js"

export const orderKeyElements = (elems, $elems, $parent) => {
  elems.forEach((elem, index) =>
    moveKeyElement(getHtmlChildNode($parent, index), findKeyElements(elem, $elems), $parent))
  return getHtmlChildNodes($parent)
}