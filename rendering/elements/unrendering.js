import { getValidEventHandlerNames, unsetEventHandlers } from "../../rendering-events/mod.js"
import { getEffects, runInitialEffects } from "../../rendering-effects/mod.js"
import { getHtmlName, isHtmlText, unrenderHtmlElement, unrenderHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"
import { throwError } from "../errors/throwing.js"
import { logElementOrText } from "./logging.js"
import { getValidPropNames, unsetInternalProps, unsetProps } from "../../rendering-props/mod.js";

export const unrenderElement = ($elem) =>
{
  logElementOrText($elem, "unrender")
  if (isHtmlText($elem)) return unrenderHtmlText($elem)

  throwError(validateHtmlElement($elem))
  const props = getJsxProps(getJsxElement($elem))
  const tagName = getHtmlName($elem)

  runInitialEffects(getEffects($elem))
  unsetProps($elem, getValidPropNames(props, tagName))
  unsetEventHandlers($elem, getValidEventHandlerNames(props))
  unsetInternalProps($elem)
  unrenderHtmlElement($elem)
  return $elem
}
