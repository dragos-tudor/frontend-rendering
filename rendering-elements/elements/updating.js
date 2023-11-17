import { setEventHandlers, setHtmlProperties } from "../../rendering-html/mod.js"
import { getJsxProps } from "../../rendering-jsx/mod.js"
import { storeInternals } from "../internals/storing.js"

export const updateHtmlElement = (elem, $elem) => {
  setHtmlProperties($elem, getJsxProps(elem))
  setEventHandlers($elem, getJsxProps(elem))
  storeInternals($elem, elem)
  return $elem
}