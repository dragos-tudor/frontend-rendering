
export const getHtmlChildren = (elem) => Array.from(elem.children ?? [])

export const getHtmlName = (elem) => elem.tagName?.toLowerCase().replace("_", "-") || "text"

export const getHtmlOwnerDocument = (elem) => elem?.ownerDocument

export const getHtmlParentElement = (elem) => elem?.parentElement