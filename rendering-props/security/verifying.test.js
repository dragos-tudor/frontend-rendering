import { assertEquals } from "/asserts.ts"
import { isSafeHtmlPropName, isSafeUrlHtmlPropValue } from "./verifying.js"

Deno.test("securely use html components => verify prop and url names", async (t) =>
{
  await t.step("safe property names => validate property names => true", () => {
    assertEquals(isSafeHtmlPropName("id"), true)
    assertEquals(isSafeHtmlPropName("name"), true)
    assertEquals(isSafeHtmlPropName("title"), true)
    assertEquals(isSafeHtmlPropName("css"), true)
  })

  await t.step("unsafe property names [innerHTML, outerHTML] => validate property names => false", () => {
    assertEquals(isSafeHtmlPropName("innerHTML"), false)
    assertEquals(isSafeHtmlPropName("outerHTML"), false)
  })

  await t.step("non-url property names => validate url names => true", () => {
    assertEquals(isSafeUrlHtmlPropValue({}, "id"), true)
    assertEquals(isSafeUrlHtmlPropValue({}, "name"), true)
    assertEquals(isSafeUrlHtmlPropValue({}, "title"), true)
  })

  await t.step("url [action, href, src] names with http protocol => validate url names => true", () => {
    assertEquals(isSafeUrlHtmlPropValue({action: "https://test"}, "action"), true)
    assertEquals(isSafeUrlHtmlPropValue({href: "https://test"}, "href"), true)
    assertEquals(isSafeUrlHtmlPropValue({src: "https://test"}, "src"), true)
  })

  await t.step("url [action, href, src] names with javascript protocol => validate url names => false", () => {
    assertEquals(isSafeUrlHtmlPropValue({action: "javascript:"}, "action"), false)
    assertEquals(isSafeUrlHtmlPropValue({href: "javascript:"}, "href"), false)
    assertEquals(isSafeUrlHtmlPropValue({href: "java\nscrip\tt:"}, "href"), false)
    assertEquals(isSafeUrlHtmlPropValue({src: "javascript:"}, "src"), false)
  })
})
