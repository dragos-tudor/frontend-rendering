import { unrenderElementChildren } from "../element-children/unrendering.js"
import { unrenderElement } from "../elements/unrendering.js"
import { shouldSkipElement } from "../elements/verifying.js"

export const unrenderElementTree = ($elem) =>
{
  const $elems = [unrenderElement($elem)]
  for(const $elem of $elems)
    shouldSkipElement($elem) ||
    $elems.push(...unrenderElementChildren($elem))
  return $elems
}