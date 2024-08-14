import { isSVGPropValue } from "../props-values/verifying.js"
import { getPropDescriptor } from "./getting.js"

export const isHtmlWritableProp = (elem, propName) =>
{
  const propDescriptor = getPropDescriptor(elem, propName)
  if (propDescriptor && "writable" in propDescriptor) return propDescriptor.writable
  if (propDescriptor && "set" in propDescriptor) return true
  if (isSVGPropValue(elem, propName)) return false
  return true
}
