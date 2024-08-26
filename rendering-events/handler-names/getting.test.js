import { assertEquals } from "/asserts.ts"
import { getValidHtmlEventHandlerNames } from "./getting.js"

Deno.test("securely use html components => get valid event handler names", async (t) =>
{
  await t.step("event handler name and function value => get valid event handlers names => event hanlder name", () => {
    assertEquals(getValidHtmlEventHandlerNames({onevent: () => {}}), ["onevent"])
  })

  await t.step("event handler name and string function value => get valid event handlers names => nothing", () => {
    assertEquals(getValidHtmlEventHandlerNames({onevent: "function(){}"}), [])
  })

  await t.step("no event handler name and and function value => get valid event handlers names => nothing", () => {
    assertEquals(getValidHtmlEventHandlerNames({event: () => {}}), [])
  })
})
