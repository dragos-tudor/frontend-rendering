import { assertEquals } from "/asserts.ts"
import { mapHtmlPropName } from "./mapping.js"

Deno.test("use html components => map prop names", async (t) =>
{
  await t.step("special prop names => map prop names => html prop names", () => {
    assertEquals(mapHtmlPropName("class"), "className")
    assertEquals(mapHtmlPropName("for"), "htmlFor")
    assertEquals(mapHtmlPropName("readonly"), "readOnly")
    assertEquals(mapHtmlPropName("tabindex"), "tabIndex")
    assertEquals(mapHtmlPropName("css"), "innerHTML")
    assertEquals(mapHtmlPropName("html"), "innerHTML")
  })

  await t.step("aria props names => map prop names => html aria names", () => {
    assertEquals(mapHtmlPropName("aria-label"), "ariaLabel")
    assertEquals(mapHtmlPropName("aria-autocomplete"), "ariaAutoComplete")
  })
})