
export const isEmptyPropValue = (propValue) => propValue == undefined || propValue === ""

export const isSVGPropValue = (elem, propName) => elem[propName]?.constructor?.name.startsWith("SVG")