import { renderElementTree } from "../element-trees/rendering.js"
import { unrenderElementTree } from "../element-trees/unrendering.js"
import { replaceElement } from "./replacing.js"
import { updateElement } from "./updating.js"
import { shouldRenderElement, shouldReplaceElement, shouldUnrenderElement, shouldUpdateElement } from "./verifying.js"

export const reconcileElement = (elem, $elem, $parent) =>
  (shouldRenderElement($elem) && renderElementTree(elem, $parent)) ||
  (shouldUnrenderElement(elem) && unrenderElementTree($elem)) ||
  (shouldUpdateElement(elem, $elem) && updateElement(elem, $elem)) ||
  (shouldReplaceElement(elem, $elem) && [replaceElement(renderElementTree(elem, $parent)[0], $elem), unrenderElementTree($elem)])