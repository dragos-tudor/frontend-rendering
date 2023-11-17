
export const isJsxArrayElems = (elems) => elems instanceof Array

export const isJsxFactory = (elem) => typeof elem.type === "function"