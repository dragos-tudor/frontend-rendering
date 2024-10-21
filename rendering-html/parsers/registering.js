export const DOMLibraryUrl = "npm:linkedom@0.18.5"

export const registerDOMParser = async (url = DOMLibraryUrl, global = globalThis) => {
  const dom = await import(url)
  global.DOMParser = global.DOMParser || dom.DOMParser
  global.CustomEvent = dom.CustomEvent
  return global.DOMParser
}