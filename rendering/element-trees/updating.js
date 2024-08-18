import { getJsxElement } from "../../rendering-jsx/mod.js"
import { isRenderedElement, isUnrenderedElement, isUpdatedElement, isStyleIgnoredOrTextElement } from "../elements/verifying.js"
import { updateElement } from "../elements/updating.js"
import { renderElementChildren } from "../element-children/rendering.js"
import { updateElementChildren } from "../element-children/updating.js"
import { unrenderElementChildren } from "../element-children/unrendering.js"
import { getEffects, runEffects } from "../../rendering-effects/mod.js";

export const updateElementTree = ($elem, elem = getJsxElement($elem)) =>
{
  const $elems = [updateElement(elem, $elem)]
  for(const $elem of $elems) {
    if (isStyleIgnoredOrTextElement($elem)) continue
    if (isUpdatedElement($elem)) $elems.push(...updateElementChildren($elem))
    if (isRenderedElement($elem)) $elems.push(...renderElementChildren($elem))
    if (isUnrenderedElement($elem)) $elems.push(...unrenderElementChildren($elem))
  }
  $elems.forEach($elem => runEffects(getEffects($elem)))
  return $elems
}