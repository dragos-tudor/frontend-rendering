import { getHtmlName } from "../../rendering-html/mod.js"

export const getErrorPath = (boundary, elem, names = []) =>
{
  if(!elem) return
  names.push(getHtmlName(elem))

  return boundary === elem?
    names.reverse().join("/"):
    getErrorPath(boundary, elem.parentElement, names)
}
