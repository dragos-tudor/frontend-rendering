import { assertEquals } from "/asserts.ts"
import { isSafeTagName } from "./verifying.js"

Deno.test("securely use html components => verify tag names", async (t) =>
{
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
})
