import { setHtmlText } from "./setting.js"

export const updateHtmlText = (text, $elem) =>
{
  setHtmlText($elem, text)
  return $elem
}