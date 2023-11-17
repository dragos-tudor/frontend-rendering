import { getHtmlParentElement, removeHtmlNode } from "../../rendering-html/mod.js"

export const unrenderHtmlText = ($elem) => getHtmlParentElement($elem)? removeHtmlNode($elem): $elem
