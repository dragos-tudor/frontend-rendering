import { setEffects } from "../../rendering-effects/mod.js";
import { throwError } from "../../support-errors/mod.js"
import { appendHtmlNode, createHtmlElement, getHtmlOwnerDocument, validateHtmlTagName } from "../../rendering-html/mod.js"
import { setContexts } from "../../rendering-components/mod.js"
import { getJsxName } from "../../rendering-jsx/mod.js"
import { enableLogging } from "../../support-loggers/mod.js"
import { setStates } from "../../rendering-states/mod.js";
import { enableIgnoring } from "../ignores/enabling.js"
import { storeInternals } from "../internals/storing.js"
import { setHtmlElement } from "./setting.js"

export const renderHtmlElement = (elem, $parent) =>
{
  throwError(validateHtmlTagName(getJsxName(elem)))

  const document = getHtmlOwnerDocument($parent)
  const $elem = createHtmlElement(document, getJsxName(elem))
  setHtmlElement($elem, elem)
  appendHtmlNode($elem, $parent)

  enableIgnoring($elem, $parent)
  enableLogging($elem, $parent)
  storeInternals($elem, elem)

  setStates($elem)
  setEffects($elem)
  setContexts($elem)

  return $elem
}