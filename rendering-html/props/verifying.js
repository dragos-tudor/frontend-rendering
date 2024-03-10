
const isSVGPropValue = (elem, propName) =>
  elem[propName]?.constructor?.name.startsWith("SVG")

export const isHtmlPropName = (elem, propName) =>
  propName in elem || propName.startsWith("__")

export const isWritableHtmlProp = (elem, propName) => {
  const descriptor = Object.getOwnPropertyDescriptor(elem, propName)
  if (descriptor && "writable" in descriptor) return descriptor.writable
  if (descriptor && "set" in descriptor) return true
  if (isSVGPropValue(elem, propName)) return false
  return true
}

