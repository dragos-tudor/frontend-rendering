import { getEffects, runEffects } from "../../rendering-effects/mod.js"
import { parseHtml } from "../../rendering-html/mod.js"
import { renderElementChildren } from "../element-children/rendering.js"
import { shouldSkipChildren } from "../element-children/verifying.js"
import { renderElement } from "../elements/rendering.js"

export const renderElementTree = (elem, $parent = parseHtml("<main></main>")) =>
{
  const $elems = [renderElement(elem, $parent)]
  for (const $elem of $elems) {
    if (shouldSkipChildren($elem)) continue
    $elems.push(...renderElementChildren($elem))
  }
  $elems.forEach($elem => runEffects(getEffects($elem)))
  return $elems
}
