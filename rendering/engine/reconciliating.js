import { renderElements } from "./rendering.js"
import { replaceElement } from "./replacing.js"
import { unrenderElements } from "./unrendering.js"
import { updateElement } from "./updating.js"
import { shouldRenderElement, shouldReplaceElement, shouldUnrenderElement, shouldUpdateElement } from "./verifying.js"

export const reconcileElement = (elem, $elem, $parent) =>
  (shouldRenderElement($elem) && renderElements(elem, $parent)) ||
  (shouldUnrenderElement(elem) && unrenderElements($elem)) ||
  (shouldUpdateElement(elem, $elem) && updateElement(elem, $elem)) ||
  (shouldReplaceElement(elem, $elem) && [replaceElement(renderElements(elem, $parent)[0], $elem), unrenderElements($elem)])