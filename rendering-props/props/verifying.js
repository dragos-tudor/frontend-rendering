import { getHtmlPropDescriptor } from "./getting.js"

export const isWritableHtmlProp = (elem, propName) =>
{
  const propDescriptor = getHtmlPropDescriptor(elem, propName)
  if (propDescriptor && "writable" in propDescriptor) return propDescriptor.writable
  if (propDescriptor && "set" in propDescriptor) return true
  return true
}
