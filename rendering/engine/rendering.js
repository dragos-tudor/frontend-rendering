import { parseHtml, validateHtmlElement } from "../../rendering-html/mod.js"
import { getJsxElement, isJsxText, validateJsxElement } from "../../rendering-jsx/mod.js"
import { renderHtmlElement, renderHtmlText, throwError } from "../../rendering-elements/mod.js"
import { handleError } from "../../rendering-elements/errors/handling.js"
import { logElement } from "./logging.js"
import { resolveJsxChildren } from "./resolving.js"
import { shouldSkipElement } from "./verifying.js"

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
    shouldSkipElement($elem) ||
    handleError(() => resolveJsxChildren(getJsxElement($elem), $elem), $elem)
      .forEach(child => rendered.push(renderElement(child, $elem)))
  }

  return rendered
}
