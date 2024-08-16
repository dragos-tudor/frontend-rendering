import { getHtmlName, getHtmlParentElement, getHtmlText, isHtmlText } from "../../rendering-html/mod.js"
import { getJsxElement, getJsxName, getJsxProps, getJsxText, isJsxElement, isJsxFactory, isJsxText } from "../../rendering-jsx/mod.js"
import { equalObjects } from "../../rendering-equalities/mod.js"
import { isIgnoredElement } from "../ignores/verifying.js"

const equalElementNames = (elem, $elem) => getJsxName(elem) === getHtmlName($elem)

const equalElementProps = (elem, $elem) => equalObjects(getJsxProps(elem), getJsxProps(getJsxElement($elem)))

const equalTexts = (elem, $elem) => getJsxText(elem) === getHtmlText($elem)


export const existsElement = (elem) => !!elem

export const isStyleElement = (elem) => getHtmlName(elem) === "style"

export const isRenderedElement = (elem) => !isUnrenderedElement(elem) && !elem.__updated

export const isUpdatedElement = (elem) => !isUnrenderedElement(elem) && elem.__updated

export const isUnrenderedElement = (elem) => !getHtmlParentElement(elem)


export const shouldSkipElement = ($elem) => isStyleElement($elem) || isIgnoredElement($elem) || isHtmlText($elem)

export const shouldRenderElement = ($elem) => !existsElement($elem)

export const shouldReplaceElement = (elem, $elem) => !equalElementNames(elem, $elem)

export const shouldUnrenderElement = (elem) => !existsElement(elem)

export const shouldUpdateElement = (elem, $elem) =>
  equalElementNames(elem, $elem) &&
  (isJsxElement(elem) ||
  (isJsxFactory(elem) && (getJsxProps(elem)["no-skip"] || !equalElementProps(elem, $elem))) ||
  (isJsxText(elem) && !equalTexts(elem, $elem)))