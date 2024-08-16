import { assertEquals } from "/asserts.ts"
import { registerDOMParser } from "../parsers/registering.js"
import { parseHtml } from "../parsers/parsing.js"
import { findHtmlAscendant, findHtmlDescendants } from "./finding.js"

await registerDOMParser()

Deno.test("use html components => find html elements", async (t) =>
{
  await t.step("html tree => find html ascendant => ascendant html element", () => {
    assertEquals(findHtmlAscendant(parseHtml("<a></a>"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(parseHtml("<a><b></b></a>").querySelector("b"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(parseHtml("<a><b><c></c></b></a>").querySelector("c"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(parseHtml("<a></a>"), e => e.tagName === "B"), undefined)
  })

  await t.step("html tree => find html descendants => descendant html elements", () => {
    assertEquals(findHtmlDescendants(parseHtml("<a></a>"), e => e.tagName === "A")[0].tagName, "A")
    assertEquals(findHtmlDescendants(parseHtml("<a><b></b></a>"), e => e.tagName === "B")[0].tagName, "B")
    assertEquals(findHtmlDescendants(parseHtml("<a><b><c></c></b></a>"), e => e.tagName === "C")[0].tagName, "C")
    assertEquals(findHtmlDescendants(parseHtml("<a><b><c></c></b><c></c></a>"), e => e.tagName === "C")[1].tagName, "C")
    assertEquals(findHtmlDescendants(parseHtml("<a></a>"), e => e.tagName === "B"), [])
  })
})