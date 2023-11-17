import { getHtmlParentNode } from "./getting.js"

export const removeHtmlNode = (node) => getHtmlParentNode(node).removeChild(node)