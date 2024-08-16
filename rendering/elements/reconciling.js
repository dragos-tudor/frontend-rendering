import { renderElement } from "./rendering.js"
import { unrenderElement } from "./unrendering.js"
import { replaceElement } from "./replacing.js"
import { updateElement } from "./updating.js"
import { shouldRenderElement, shouldReplaceElement, shouldUnrenderElement, shouldUpdateElement } from "./verifying.js"

export const reconcileElement = (elem, $elem, $parent) =>
{
  if (shouldRenderElement($elem)) return renderElement(elem, $parent)
  if (shouldUnrenderElement(elem)) return unrenderElement($elem)
  if (shouldUpdateElement(elem, $elem)) return updateElement(elem, $elem)
  if (shouldReplaceElement(elem, $elem)) return [replaceElement(renderElement(elem, $parent), $elem), unrenderElement($elem)]
  return []
}