import { renderElements } from "./engine/rendering.js"
import { updateElements } from "./engine/updating.js"
import { unrenderElements } from "./engine/unrendering.js"
import { parseHtml } from "../rendering-html/mod.js"

export const render = (elem, $parent = parseHtml("<main></main>")) => {
  $parent.ownerDocument.__render = $parent.ownerDocument.__render  || renderElements
  $parent.ownerDocument.__update = $parent.ownerDocument.__update  || updateElements
  $parent.ownerDocument.__unrender = $parent.ownerDocument.__unrender  || unrenderElements
  return renderElements(elem, $parent)[0]
}
export { updateElements as update } from "./engine/updating.js"
export { unrenderElements as unrender } from "./engine/unrendering.js"