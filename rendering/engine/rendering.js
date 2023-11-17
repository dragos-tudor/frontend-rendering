import { throwError } from "../../support-errors/mod.js"
import { parseHtml, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement, isJsxText, validateJsxElement } from "../../rendering-jsx/mod.js"
import { logElement, renderHtmlElement, renderHtmlText } from "../../rendering-elements/mod.js"
import { handleError } from "../../support-errors/errors/handling.js"
import { resolveJsxChildren } from "./resolving.js"
import { shouldRenderChildren } from "./verifying.js"

const renderElement = (elem, $parent) =>
  (isJsxText(elem)?
    renderHtmlText:
    renderHtmlElement)
  (elem, $parent)

export const renderElements = (elem, $parent = parseHtml("<main></main>")) => {
  isJsxText(elem) || throwError(validateHtmlElement($parent))
  isJsxText(elem) || throwError(validateJsxElement(elem))
  const rendered = [renderElement(elem, $parent)]

  for (const $elem of rendered) {
    logElement($elem, "render")
    shouldRenderChildren($elem) &&
    handleError(() => resolveJsxChildren(getJsxElement($elem), $elem), $elem)
      .forEach(child => rendered.push(renderElement(child, $elem)))
  }

  return rendered
}
