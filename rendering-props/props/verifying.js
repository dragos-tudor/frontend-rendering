import { getPropDescriptor } from "./getting.js"

export const isWritableProp = (elem, propName) =>
{
  const propDescriptor = getPropDescriptor(elem, propName)
  if (propDescriptor && "writable" in propDescriptor) return propDescriptor.writable
  if (propDescriptor && "set" in propDescriptor) return true
  return true
}
