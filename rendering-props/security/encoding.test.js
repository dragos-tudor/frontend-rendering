import { assertEquals } from "/asserts.ts"
import { encodeHtml, encodeJs } from "./encoding.js"

Deno.test("securely use html components => encode html/js texts", async (t) =>
{
  await t.step("html reserved characters => encode html characters => html characters encoded as HTML character entities", () => {
    assertEquals(encodeHtml("&"), "&#38;")
    assertEquals(encodeHtml(">"), "&#62;")
    assertEquals(encodeHtml("<"), "&#60;")
    assertEquals(encodeHtml('"'), "&#34;")
    assertEquals(encodeHtml("'"), "&#39;")
  })

  await t.step("js script => encode script => encoded script became safely script", () => {
    assertEquals(encodeJs("<script>alert('abc!')</script>"), "\\u003cscript\\u003ealert\\u0028\\u0027abc\\u0021\\u0027\\u0029\\u003c\\u002fscript\\u003e")
  })
})
