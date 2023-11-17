
export const getHtmlName = (elem) => elem.tagName?.toLowerCase() || "text"

export const getHtmlOwnerDocument = (elem) => elem?.ownerDocument

export const getHtmlParentElement = (elem) => elem?.parentElement