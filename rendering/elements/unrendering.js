import { unsetHtmlEventHandlers } from "../../rendering-events/mod.js"
import { getEffects, runInitialEffects } from "../../rendering-effects/mod.js"
import { isHtmlText, unrenderHtmlElement, unrenderHtmlText, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"
import { throwError } from "../errors/throwing.js"
import { logElementOrText } from "./logging.js"
import { unsetInternalHtmlProps, unsetHtmlProps } from "../../rendering-props/mod.js";
import { unsetHtmlAttrs } from "../../rendering-attrs/mod.js";

export const unrenderElement = ($elem) =>
{
  logElementOrText($elem, "unrender")
  if (isHtmlText($elem)) return unrenderHtmlText($elem)

  throwError(validateHtmlElement($elem))
  const props = getJsxProps(getJsxElement($elem))

  runInitialEffects(getEffects($elem))
  unsetHtmlAttrs($elem, props)
  unsetHtmlProps($elem, props)
  unsetHtmlEventHandlers($elem, props)
  unsetInternalHtmlProps($elem)
  unrenderHtmlElement($elem)
  return $elem
}
