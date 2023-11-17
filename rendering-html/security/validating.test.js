import { assertEquals } from "/asserts.ts"
import { isSafeTagName, isSafePropName, isSafeEventHandler, isSafeUrl } from "./validating.js"

Deno.test("securely use html components => validate html texts", async (t) => {

  await t.step("safe element names => validate element names => true", () => {
    assertEquals(isSafeTagName("div"), true)
    assertEquals(isSafeTagName("span"), true)
    assertEquals(isSafeTagName("img"), true)
    assertEquals(isSafeTagName("style"), true)
  })

  await t.step("unsafe elements [SCRIPT, IFRAME] names => validate element names => false", () => {
    assertEquals(isSafeTagName("SCRIPT"), false)
    assertEquals(isSafeTagName("script"), false)
    assertEquals(isSafeTagName("IFRAME"), false)
    assertEquals(isSafeTagName("iframe"), false)
  })

  await t.step("safe property names => validate property names => true", () => {
    assertEquals(isSafePropName("", "id"), true)
    assertEquals(isSafePropName("", "name"), true)
    assertEquals(isSafePropName("", "title"), true)
    assertEquals(isSafePropName("style", "css"), true)
  })

  await t.step("unsafe property names [css, style, innerHTML, outerHTML] => validate property names => false", () => {
    assertEquals(isSafePropName("", "css"), false)
    assertEquals(isSafePropName("", "style"), false)
    assertEquals(isSafePropName("", "innerHTML"), false)
    assertEquals(isSafePropName("", "outerHTML"), false)
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

  await t.step("function event handler => validate event handler => true", () => {
    assertEquals(isSafeEventHandler({onevent: () => {}}, "onevent"), true)
  })

  await t.step("string function event handler => validate event handler => false", () => {
    assertEquals(isSafeEventHandler({onevent: "function(){}"}, "onevent"), false)
  })

})
