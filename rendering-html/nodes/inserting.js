import { getHtmlParentNode } from "./getting.js"

export const insertHtmlNode = (node, oldNode) => getHtmlParentNode(oldNode).insertBefore(node, oldNode) && node