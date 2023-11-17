import { assertEquals } from "/asserts.ts"
import { mapPropName } from "./mapping.js"

Deno.test("use html components => use html attribute names", async (t) => {

  await t.step("special prop names => map names => html property names", () => {
    assertEquals(mapPropName("class"), "className")
    assertEquals(mapPropName("for"), "htmlFor")
    assertEquals(mapPropName("readonly"), "readOnly")
    assertEquals(mapPropName("tabindex"), "tabIndex")
    assertEquals(mapPropName("css"), "innerHTML")
    assertEquals(mapPropName("html"), "innerHTML")
  })

  await t.step("aria props names => map names => html aria names", () => {
    assertEquals(mapPropName("aria-label"), "ariaLabel")
    assertEquals(mapPropName("aria-autocomplete"), "ariaAutoComplete")
  })

})