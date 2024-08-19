import { assertEquals } from "/asserts.ts"
import { isHtmlEventHandler } from "./verifying.js"

Deno.test("securely use html components => verify event handlers", async (t) =>
{
  await t.step("function event handler => verify event handler => true", () => {
    assertEquals(isHtmlEventHandler({onevent: () => {}}, "onevent"), true)
  })

  await t.step("string function event handler => verify event handler => false", () => {
    assertEquals(isHtmlEventHandler({onevent: "function(){}"}, "onevent"), false)
  })

  await t.step("no event name handler => verify event handler => false", () => {
    assertEquals(isHtmlEventHandler({event: "function(){}"}, "event"), false)
  })
})
