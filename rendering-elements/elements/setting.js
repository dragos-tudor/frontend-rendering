import { setEventHandlers, setHtmlProperties } from "../../rendering-html/mod.js"
import { getJsxProps } from "../../rendering-jsx/mod.js"

export const setHtmlElement = ($elem, elem) => {
  setHtmlProperties($elem, getJsxProps(elem))
  setEventHandlers($elem, getJsxProps(elem))
  return $elem
}