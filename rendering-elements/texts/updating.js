import { setHtmlText } from "../../rendering-html/mod.js"

export const updateHtmlText = (text, $elem) => {
  setHtmlText($elem, text)
  return $elem
}