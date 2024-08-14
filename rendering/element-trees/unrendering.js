import { getHtmlChildNodes } from "../../rendering-html/mod.js"
import { unrenderElement } from "../elements/unrendering.js"
import { shouldSkipElement } from "../elements/verifying.js"

export const unrenderElementTree = ($elem) =>
{
  const unrendered = [unrenderElement($elem)]
  for(const $elem of unrendered)
    shouldSkipElement($elem) ||
    getHtmlChildNodes($elem)
      .forEach($child => unrendered.push(unrenderElement($child)))
  return unrendered
}