import { setHtmlAttrValue } from "../attributes/setting.js"
import { getValidHtmlPropNames } from "../props-names/getting.js";
import { mapHtmlPropName } from "../props-names/mapping.js"
import { getPropValue } from "../props-values/getting.js";
import { resolveHtmlPropValue } from "../props-values/resolving.js"
import { setHtmlPropValue, setStyleHtmlPropValues } from "../props-values/setting.js"
import { getHtmlPropType, HtmlPropTypes } from "./getting.js"

export const setHtmlProp = (elem, props, propName) =>
{
  const mappedName = mapHtmlPropName(propName)
  const propValue = getPropValue(props, propName)
  const propType = getHtmlPropType(elem, mappedName)

  switch (propType) {
    case HtmlPropTypes.attr: setHtmlAttrValue(elem, mappedName, propValue); break
    case HtmlPropTypes.style: setStyleHtmlPropValues(elem, propValue); break
    case HtmlPropTypes.svgProp: setHtmlAttrValue(elem, propName, propValue); break
    case HtmlPropTypes.writableProp: setHtmlPropValue(elem, mappedName, resolveHtmlPropValue(propName, propValue)); break
  }
  return elem
}

export const setHtmlProps = (elem, props, tagName) => getValidHtmlPropNames(props, tagName).reduce((elem, propName) => setHtmlProp(elem, props, propName), elem)