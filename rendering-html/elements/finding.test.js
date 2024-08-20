import { assertEquals } from "/asserts.ts"
import { registerDOMParser } from "../parsers/registering.js"
import { parseHtml } from "../parsers/parsing.js"
import { findHtmlAscendant, findHtmlAscendants, findHtmlDescendant, findHtmlDescendants } from "./finding.js"

await registerDOMParser()

Deno.test("use html components => find html elements", async (t) =>
{
  await t.step("html element => find ascendant => ascendant element", () => {
    assertEquals(findHtmlAscendant(parseHtml("<a><b></b></a>").querySelector("b"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(parseHtml("<a><b><c></c></b></a>").querySelector("c"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(parseHtml("<a></a>"), e => e.tagName === "B"), undefined)
  })

  await t.step("html element => find ascendants => ascendant elements", () => {
    assertEquals(findHtmlAscendants(parseHtml("<a><b></b></a>").querySelector("b"), e => e.tagName === "A").map(e => e.tagName), ["B", "A"])
    assertEquals(findHtmlAscendants(parseHtml("<a><b><c></c></b></a>").querySelector("c"), e => e.tagName === "A").map(e => e.tagName), ["C", "B", "A"])
    assertEquals(findHtmlAscendants(parseHtml("<a></a>"), e => e.tagName === "B"), [])
  })

  await t.step("html element => find descendant => descendant element", () => {
    assertEquals(findHtmlDescendant(parseHtml("<a><b></b></a>"), e => e.tagName === "B").tagName, "B")
    assertEquals(findHtmlDescendant(parseHtml("<a><b><c></c></b></a>"), e => e.tagName === "C").tagName, "C")
    assertEquals(findHtmlDescendant(parseHtml("<a><b></b><c></c></a>"), e => e.tagName === "C").tagName, "C")
    assertEquals(findHtmlDescendant(parseHtml("<a><b><c class=\"level2\"></c></b><c class=\"level1\"></c></a>"), e => e.tagName === "C").className, "level1")
    assertEquals(findHtmlDescendant(parseHtml("<a></a>"), e => e.tagName === "B"), undefined)
  })

  await t.step("html element => find descendants => descendant elements", () => {
    assertEquals(findHtmlDescendants(parseHtml("<a><b></b></a>"), e => e.tagName === "B")[0].tagName, "B")
    assertEquals(findHtmlDescendants(parseHtml("<a><b><c></c></b></a>"), e => e.tagName === "C")[0].tagName, "C")
    assertEquals(findHtmlDescendants(parseHtml("<a><b><c></c></b><c></c></a>"), e => e.tagName === "C")[1].tagName, "C")
    assertEquals(findHtmlDescendants(parseHtml("<a></a>"), e => e.tagName === "B"), [])
  })
})
