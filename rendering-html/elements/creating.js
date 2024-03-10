
export const createHtmlElement = (document, tagName) =>
  document.createElement(tagName)

export const createHtmlElementNS = (document, ns, tagName) =>
  document.createElementNS(ns, tagName)