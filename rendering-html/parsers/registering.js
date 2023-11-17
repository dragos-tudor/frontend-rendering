export const DOMLibraryUrl = "https://esm.sh/linkedom@0.14.26"

export const registerDOMParser = async (url = DOMLibraryUrl, global = globalThis) => {
  const dom = await import(url)
  global.DOMParser = global.DOMParser || dom.DOMParser
  global.CustomEvent = dom.CustomEvent
  return global.DOMParser
}