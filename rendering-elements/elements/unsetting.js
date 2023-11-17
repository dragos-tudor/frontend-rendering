import { unsetHtmlProperties, unsetEventHandlers } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxProps } from "../../rendering-jsx/mod.js"

export const unsetHtmlElement = ($elem) => {
  const props = getJsxProps(getJsxElement($elem))
  unsetHtmlProperties($elem, props)
  unsetEventHandlers($elem, props)
  return $elem
}