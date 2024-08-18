import { renderElement } from "./rendering.js"
import { unrenderElement } from "./unrendering.js"
import { replaceElement } from "./replacing.js"
import { updateElement } from "./updating.js"
import { getReconcilingType, ReconcilingTypes } from "../element-reconcilings/getting.js"

export const reconcileElement = (elem, $elem, $parent) =>
{
  switch(getReconcilingType(elem, $elem)) {
    case ReconcilingTypes.render: return renderElement(elem, $parent)
    case ReconcilingTypes.replace: return [replaceElement(renderElement(elem, $parent), $elem), unrenderElement($elem)]
    case ReconcilingTypes.update: return updateElement(elem, $elem)
    case ReconcilingTypes.unrender:return unrenderElement($elem)
    default: return []
  }
}