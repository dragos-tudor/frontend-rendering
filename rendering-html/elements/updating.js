import { setEventHandlers, setHtmlProps } from "../../rendering-html/mod.js"

export const updateHtmlElement = ($elem, props) =>
{
  setHtmlProps($elem, props)
  setEventHandlers($elem, props)
  return $elem
}