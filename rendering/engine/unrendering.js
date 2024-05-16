import { getHtmlChildNodes, isHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { unrenderHtmlElement, unrenderHtmlText, throwError } from "../../rendering-elements/mod.js"
import { getEffects, runInitialEffects } from "../../rendering-effects/mod.js"
import { logElement } from "./logging.js"
import { shouldSkipElement } from "./verifying.js"

const unrenderElement = ($elem) => (
  logElement($elem, "unrender"), (
  isHtmlText($elem)?
    unrenderHtmlText($elem):
    (runInitialEffects(getEffects($elem)), unrenderHtmlElement($elem))))

export const unrenderElements = ($elem) => {
  isHtmlText($elem) || throwError(validateHtmlElement($elem))
  const unrendered = [unrenderElement($elem)]

  for(const $elem of unrendered)
    shouldSkipElement($elem) ||
    getHtmlChildNodes($elem)
      .forEach($child => unrendered.push(unrenderElement($child)))

  return unrendered
}