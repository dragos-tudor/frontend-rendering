import { parseHtml } from "../../rendering-html/mod.js"
import { getJsxElement } from "../../rendering-jsx/mod.js"
import { handleError } from "../errors/handling.js"
import { resolveJsxChildren } from "../element-children/resolving.js"
import { renderElement } from "../elements/rendering.js"
import { shouldSkipElement } from "../elements/verifying.js"

export const renderElementTree = (elem, $parent = parseHtml("<main></main>")) =>
{
  const rendered = [renderElement(elem, $parent)]
  for (const $elem of rendered)
    shouldSkipElement($elem) ||
    handleError(() => resolveJsxChildren(getJsxElement($elem), $elem), $elem)
      .forEach(child => rendered.push(renderElement(child, $elem)))
  return rendered
}
