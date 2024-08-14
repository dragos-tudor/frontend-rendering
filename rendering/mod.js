import { renderElementTree } from "./element-trees/rendering.js"
import { updateElementTree } from "./element-trees/updating.js"
import { unrenderElementTree } from "./element-trees/unrendering.js"
import { parseHtml } from "../rendering-html/mod.js"

export const render = (elem, $parent = parseHtml("<main></main>")) => {
  $parent.ownerDocument.__render = $parent.ownerDocument.__render  || renderElementTree
  $parent.ownerDocument.__update = $parent.ownerDocument.__update  || updateElementTree
  $parent.ownerDocument.__unrender = $parent.ownerDocument.__unrender  || unrenderElementTree
  return renderElementTree(elem, $parent)[0]
}
export { updateElementTree as update } from "./element-trees/updating.js"
export { unrenderElementTree as unrender } from "./element-trees/unrendering.js"