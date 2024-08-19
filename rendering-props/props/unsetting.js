import { removeHtmlAttr } from "../attributes/removing.js"
import { getHtmlPropNames, getValidHtmlPropNames } from "../props-names/getting.js"
import { mapHtmlPropName } from "../props-names/mapping.js"
import { isInternalHtmlPropName } from "../props-names/verifying.js"
import { unsetHtmlPropValue } from "../props-values/unsetting.js"
import { getHtmlPropType, HtmlPropTypes } from "./getting.js";

export const unsetHtmlProp = (elem, propName) =>
{
  const mappedName = mapHtmlPropName(propName)
  const propType = getHtmlPropType(elem, mappedName)

  switch (propType) {
    case HtmlPropTypes.attr: removeHtmlAttr(elem, mappedName); break
    case HtmlPropTypes.writableProp: unsetHtmlPropValue(elem, mappedName); break
  }
  return elem
}

export const unsetInternalHtmlProps = (elem) => getHtmlPropNames(elem).filter(isInternalHtmlPropName).reduce((elem, propName) => unsetHtmlProp(elem, propName), elem)

export const unsetHtmlProps = (elem, props, tagName) => getValidHtmlPropNames(props, tagName).reduce((elem, propName) => unsetHtmlProp(elem, propName), elem)