import { getHtmlParentElement } from "../elements/getting.js"
import { removeHtmlNode } from "../nodes/removing.js"

export const unrenderHtmlText = ($elem) => getHtmlParentElement($elem)? removeHtmlNode($elem): $elem
