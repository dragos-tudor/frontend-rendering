import { assertEquals } from "/asserts.ts"
import { isEventHandler } from "./verifying.js"

Deno.test("securely use html components => verify event handlers", async (t) =>
{
  await t.step("function event handler => verify event handler => true", () => {
    assertEquals(isEventHandler({onevent: () => {}}, "onevent"), true)
  })

  await t.step("string function event handler => verify event handler => false", () => {
    assertEquals(isEventHandler({onevent: "function(){}"}, "onevent"), false)
  })

  await t.step("no event name handler => verify event handler => false", () => {
    assertEquals(isEventHandler({event: "function(){}"}, "event"), false)
  })
})
