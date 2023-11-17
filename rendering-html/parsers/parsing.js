
const HtmlMimeType = "text/html"

export const parseHtml = (html) => new DOMParser().parseFromString(html, HtmlMimeType).documentElement