import { renderElement } from "./rendering.js"
import { unrenderElement } from "./unrendering.js"
import { replaceElement } from "./replacing.js"
import { updateElement } from "./updating.js"
import { getReconciliationType, ReconciliationTypes } from "../reconciliations/getting.js"

export const reconcileElement = (elem, $elem, $parent) =>
{
  switch(getReconciliationType(elem, $elem)) {
    case ReconciliationTypes.render: return renderElement(elem, $parent)
    case ReconciliationTypes.replace: return [replaceElement(renderElement(elem, $parent), $elem), unrenderElement($elem)]
    case ReconciliationTypes.update: return updateElement(elem, $elem)
    case ReconciliationTypes.unrender:return unrenderElement($elem)
    default: return []
  }
}