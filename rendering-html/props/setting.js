import { setAttribute } from "../attributes/setting.js"
import { getPropNameType, getValidPropNames, PropNameTypes } from "../props-names/getting.js"
import { mapPropName } from "../props-names/mapping.js"
import { resolvePropValue } from "../props-values/resolving.js"
import { setHtmlInternalValue, setHtmlPropValue, setHtmlStylePropValues } from "../props-values/setting.js"

const setHtmlProp = (props) => (elem, propName) =>
{
  const htmlPropName = mapPropName(propName)
  const htmlPropValue = resolvePropValue(props, propName)
  switch (getPropNameType(elem, htmlPropName)) {
    case PropNameTypes.attr: setAttribute(elem, htmlPropName, htmlPropValue); break
    case PropNameTypes.internal: setHtmlInternalValue(elem, htmlPropName, htmlPropValue); break
    case PropNameTypes.writableProp: setHtmlPropValue(elem, htmlPropName, htmlPropValue); break
    case PropNameTypes.style: setHtmlStylePropValues(elem, props[propName]); break
  }
  return elem
}

export const setHtmlProps = (elem, props) => getValidPropNames(elem, props).reduce(setHtmlProp(props), elem)