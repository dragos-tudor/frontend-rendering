import { setEventHandlers } from "../event-handlers/setting.js"
import { setHtmlProps } from "../props/setting.js"

export const setHtmlElement = ($elem, props) =>
{
  setHtmlProps($elem, props)
  setEventHandlers($elem, props)
  return $elem
}