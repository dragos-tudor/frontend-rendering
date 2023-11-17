import { getHtmlParentNode } from "./getting.js"

export const replaceHtmlNode = (node, oldNode) => getHtmlParentNode(oldNode).replaceChild(node, oldNode)