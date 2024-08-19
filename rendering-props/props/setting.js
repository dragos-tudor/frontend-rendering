import { setHtmlAttr } from "../attributes/setting.js"
import { getValidHtmlPropNames } from "../props-names/getting.js";
import { mapHtmlPropName } from "../props-names/mapping.js"
import { resolveHtmlPropValue } from "../props-values/resolving.js"
import { setHtmlPropValue, setStyleHtmlPropValues } from "../props-values/setting.js"
import { getHtmlPropType, HtmlPropTypes } from "./getting.js"

export const setHtmlProp = (elem, props, propName) =>
{
  const mappedName = mapHtmlPropName(propName)
  const resolvedValue = resolveHtmlPropValue(props, propName)
  const propType = getHtmlPropType(elem, mappedName)

  switch (propType) {
    case HtmlPropTypes.attr: setHtmlAttr(elem, mappedName, resolvedValue); break
    case HtmlPropTypes.writableProp: setHtmlPropValue(elem, mappedName, resolvedValue); break
    case HtmlPropTypes.style: setStyleHtmlPropValues(elem, props[propName]); break
  }
  return elem
}

export const setHtmlProps = (elem, props, tagName) => getValidHtmlPropNames(props, tagName).reduce((elem, propName) => setHtmlProp(elem, props, propName), elem)