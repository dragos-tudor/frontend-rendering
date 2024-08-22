import { assertEquals } from "/asserts.ts"
import { isSafeHtmlPropName } from "./verifying.js"

Deno.test("securely use html components => verify prop and url names", async (t) =>
{
  await t.step("safe property names => validate property names => true", () => {
    assertEquals(isSafeHtmlPropName({}, "id"), true)
    assertEquals(isSafeHtmlPropName({}, "name"), true)
    assertEquals(isSafeHtmlPropName({}, "title"), true)
    assertEquals(isSafeHtmlPropName({}, "css"), true)
  })

  await t.step("unsafe property names [innerHTML, outerHTML] => validate property names => false", () => {
    assertEquals(isSafeHtmlPropName({}, "innerHTML"), false)
    assertEquals(isSafeHtmlPropName({}, "outerHTML"), false)
  })

  await t.step("url [action, href, src] names with http protocol => validate url names => true", () => {
    assertEquals(isSafeHtmlPropName({action: "https://test"}, "action"), true)
    assertEquals(isSafeHtmlPropName({href: "https://test"}, "href"), true)
    assertEquals(isSafeHtmlPropName({src: "https://test"}, "src"), true)
  })

  await t.step("url [action, href, src] names with javascript protocol => validate url names => false", () => {
    assertEquals(isSafeHtmlPropName({action: "javascript:"}, "action"), false)
    assertEquals(isSafeHtmlPropName({href: "javascript:"}, "href"), false)
    assertEquals(isSafeHtmlPropName({href: "java\nscrip\tt:"}, "href"), false)
    assertEquals(isSafeHtmlPropName({src: "javascript:"}, "src"), false)
  })
})
