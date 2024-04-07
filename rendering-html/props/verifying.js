import { isSVGPropValue } from "../props-values/verifying.js"

export const isHtmlProperty = (elem, propName) => propName in elem

export const isHtmlWritableProperty = (elem, propName) => {
  const descriptor = Object.getOwnPropertyDescriptor(elem, propName)
  if (descriptor && "writable" in descriptor) return descriptor.writable
  if (descriptor && "set" in descriptor) return true
  if (isSVGPropValue(elem, propName)) return false
  return true
}
