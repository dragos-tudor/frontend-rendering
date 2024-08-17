import { setAttr } from "../attributes/setting.js"
import { getValidPropNames } from "../props-names/getting.js";
import { mapPropName } from "../props-names/mapping.js"
import { resolvePropValue } from "../props-values/resolving.js"
import { setPropValue, setStylePropValues } from "../props-values/setting.js"
import { getPropType, PropTypes } from "./getting.js"

export const setProp = (elem, props, propName) =>
{
  const mappedName = mapPropName(propName)
  const resolvedValue = resolvePropValue(props, propName)
  const propType = getPropType(elem, mappedName)

  switch (propType) {
    case PropTypes.attr: setAttr(elem, mappedName, resolvedValue); break
    case PropTypes.writableProp: setPropValue(elem, mappedName, resolvedValue); break
    case PropTypes.style: setStylePropValues(elem, props[propName]); break
  }
  return elem
}

export const setProps = (elem, props, tagName) => getValidPropNames(props, tagName).reduce((elem, propName) => setProp(elem, props, propName), elem)