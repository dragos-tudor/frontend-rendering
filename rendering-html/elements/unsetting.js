import { unsetHtmlProperties, unsetEventHandlers } from "../../rendering-html/mod.js"

export const unsetHtmlElement = ($elem, props) =>
{
  unsetHtmlProperties($elem, props)
  unsetEventHandlers($elem, props)
  return $elem
}