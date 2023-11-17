import { getHtmlChildNode, getHtmlChildNodes, insertHtmlNode } from "../../rendering-html/mod.js"
import { insertHtmlText } from "../texts/inserting.js"
import { findElementsByKey } from "./finding.js"

export const orderElementKey = ($source, $target, $parent) =>
  ($target === $source && $source) ||
  ($source && $target && insertHtmlNode($target, $source)) ||
  ($source && insertHtmlText("", $source, $parent))

export const orderElementKeys = (elems, $elems, $parent) => {
  elems.forEach((elem, index) =>
    orderElementKey(getHtmlChildNode($parent, index), findElementsByKey(elem, $elems), $parent))
  return getHtmlChildNodes($parent)
}