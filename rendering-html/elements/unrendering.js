import { removeHtmlNode } from "../nodes/removing.js"
import { getHtmlParentElement } from "./getting.js"

export const unrenderHtmlElement = ($elem) => getHtmlParentElement($elem)? removeHtmlNode($elem): $elem