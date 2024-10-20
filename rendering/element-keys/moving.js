import { insertHtmlNode, insertHtmlText } from "../../rendering-html/mod.js"

export const moveKeyElement = ($source, $target, $parent) =>
  ($target === $source && $source) ||
  ($source && $target && insertHtmlNode($target, $source)) ||
  ($source && insertHtmlText("", $source, $parent))