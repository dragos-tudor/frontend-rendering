import { unrenderElementChildren } from "../element-children/unrendering.js"
import { shouldSkipChildren } from "../element-children/verifying.js"
import { unrenderElement } from "../elements/unrendering.js"

export const unrenderElementTree = ($elem) =>
{
  const $elems = [unrenderElement($elem)]
  for(const $elem of $elems) {
    if (shouldSkipChildren($elem)) continue
    $elems.push(...unrenderElementChildren($elem))
  }
  return $elems
}