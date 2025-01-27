import { assertEquals, assertNotStrictEquals } from "/asserts.ts"
import { registerLinkeDomParser } from "../parsers/registering.js"
import { parseHtml } from "./parsing.js"

await registerLinkeDomParser()

Deno.test("use html components => parse elements", async (t) => {

  await t.step("html text => parse element => html element", () => {
    assertEquals(parseHtml("<a></a>").tagName, "A")
  })

  await t.step("html text => parse root elements => html elements with different roots", () => {
    assertNotStrictEquals(parseHtml("<a></a>").ownerDocument, parseHtml("<a></a>").ownerDocument)
  })

  await t.step("html text => parse style element => html style element", () => {
    assertEquals(parseHtml("<style></style>").tagName, "STYLE")
    assertEquals(parseHtml("<style>body{margin: 0px;}</style>").innerHTML, "body{margin: 0px;}")
  })

})