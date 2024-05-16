import { equalElementNames, equalElementProps, equalTexts, existsElement, isIgnoredElement, isStyleElement } from "../../rendering-elements/mod.js"
import { getJsxProps, isJsxFactory, isJsxText, isJsxElement } from "../../rendering-jsx/mod.js"
import { isHtmlText } from "../../rendering-html/mod.js"

export const shouldSkipElement = ($elem) => isStyleElement($elem) || isIgnoredElement($elem) || isHtmlText($elem)

export const shouldRenderElement = ($elem) => !existsElement($elem)

export const shouldReplaceElement = (elem, $elem) => !equalElementNames(elem, $elem)

export const shouldUnrenderElement = (elem) => !existsElement(elem)

export const shouldUpdateElement = (elem, $elem) =>
  equalElementNames(elem, $elem) &&
  (isJsxElement(elem) ||
  (isJsxFactory(elem) && (getJsxProps(elem)["no-skip"] || !equalElementProps(elem, $elem))) ||
  (isJsxText(elem) && !equalTexts(elem, $elem)))