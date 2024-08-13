import { setEventHandlers, setHtmlClassName, setHtmlProperties } from "../../rendering-html/mod.js"
import { getJsxProps, getJsxFactoryClassName } from "../../rendering-jsx/mod.js"

export const setHtmlElement = ($elem, elem) =>
{
  setHtmlClassName($elem, getJsxFactoryClassName(elem))
  setHtmlProperties($elem, getJsxProps(elem))
  setEventHandlers($elem, getJsxProps(elem))
  return $elem
}