import { assertThrows } from "/asserts.ts"
import { render } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { Lazy } from "./lazy.jsx"

await registerDOMParser()

Deno.test("use code splitting => validate lazy components", async (t) =>
{
  await t.step("lazy loader non function => lazy => loader not a function error", () => {
    assertThrows(() => render(<Lazy loader={1}></Lazy>), Error, "Lazy loader should be function.")
  })
})