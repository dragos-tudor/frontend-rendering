import { unrenderElementChildren } from "../element-children/unrendering.js"
import { unrenderElement } from "../elements/unrendering.js"
import { isStyleIgnoredOrTextElement } from "../elements/verifying.js"

export const unrenderElementTree = ($elem) =>
{
  const $elems = [unrenderElement($elem)]
  for(const $elem of $elems)
    isStyleIgnoredOrTextElement($elem) ||
    $elems.push(...unrenderElementChildren($elem))
  return $elems
}