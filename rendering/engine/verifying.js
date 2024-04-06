import { equalObjects } from "../../support-equalities/mod.js"
import { existsElement, isIgnoredElement } from "../../rendering-elements/mod.js"
import { getJsxName, getJsxProps, getJsxText, getJsxElement, isJsxFactory, isJsxText, isJsxElement } from "../../rendering-jsx/mod.js"
import { getHtmlName, getHtmlText, isHtmlElement, isHtmlText } from "../../rendering-html/mod.js"


const equalElementNames = (elem, $elem) => getJsxName(elem) === getHtmlName($elem)

const equalElementProps = (elem, $elem) => equalObjects(getJsxProps(elem), getJsxProps(getJsxElement($elem)))

const equalElementTexts = (elem, $elem) => getJsxText(elem) === getHtmlText($elem)


export const isFactoryElement = ($elem)=> !isHtmlText($elem) && isJsxFactory(getJsxElement($elem))

export const isStyleElement = (elem) => getHtmlName(elem) === "style"

export const isUpdatedElement = ($elem) => isHtmlElement($elem)


export const shouldSkipElement = ($elem) => isStyleElement($elem) || isIgnoredElement($elem) || isHtmlText($elem)

export const shouldRenderElement = ($elem) => !existsElement($elem)

export const shouldReplaceElement = (elem, $elem) => !equalElementNames(elem, $elem)

export const shouldUnrenderElement = (elem) => !existsElement(elem)

export const shouldUpdateElement = (elem, $elem) =>
  equalElementNames(elem, $elem) &&
  (isJsxElement(elem) ||
  (isJsxFactory(elem) && (getJsxProps(elem)["no-skip"] || !equalElementProps(elem, $elem))) ||
  (isJsxText(elem) && !equalElementTexts(elem, $elem)))