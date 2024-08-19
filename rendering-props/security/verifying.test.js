import { assertEquals } from "/asserts.ts"
import { isSafeHtmlPropName, isSafeUrl } from "./verifying.js"

Deno.test("securely use html components => verify prop and url names", async (t) =>
{
  await t.step("safe property names => validate property names => true", () => {
    assertEquals(isSafeHtmlPropName("", "id"), true)
    assertEquals(isSafeHtmlPropName("", "name"), true)
    assertEquals(isSafeHtmlPropName("", "title"), true)
    assertEquals(isSafeHtmlPropName("style", "css"), true)
  })

  await t.step("unsafe property names [css, innerHTML, outerHTML] => validate property names => false", () => {
    assertEquals(isSafeHtmlPropName("", "css"), false)
    // assertEquals(isSafePropName("", "style"), false)
    assertEquals(isSafeHtmlPropName("", "innerHTML"), false)
    assertEquals(isSafeHtmlPropName("", "outerHTML"), false)
  })

  await t.step("non-url property names => validate url names => true", () => {
    assertEquals(isSafeUrl({}, "id"), true)
    assertEquals(isSafeUrl({}, "name"), true)
    assertEquals(isSafeUrl({}, "title"), true)
  })

  await t.step("url [action, href, src] names with http protocol => validate url names => true", () => {
    assertEquals(isSafeUrl({action: "https://test"}, "action"), true)
    assertEquals(isSafeUrl({href: "https://test"}, "href"), true)
    assertEquals(isSafeUrl({src: "https://test"}, "src"), true)
  })

  await t.step("url [action, href, src] names with javascript protocol => validate url names => false", () => {
    assertEquals(isSafeUrl({action: "javascript:"}, "action"), false)
    assertEquals(isSafeUrl({href: "javascript:"}, "href"), false)
    assertEquals(isSafeUrl({href: "java\nscrip\tt:"}, "href"), false)
    assertEquals(isSafeUrl({src: "javascript:"}, "src"), false)
  })
})
