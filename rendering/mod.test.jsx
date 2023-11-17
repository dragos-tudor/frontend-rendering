import { assertExists } from "/asserts.ts"
import { registerDOMParser } from "../rendering-html/mod.js";
import { render } from "./mod.js"

await registerDOMParser()

Deno.test("use rendering => render, update, unrender funcs are stored", () => {
  const elem = render(<a></a>)
  assertExists(elem.ownerDocument.__render)
  assertExists(elem.ownerDocument.__update)
  assertExists(elem.ownerDocument.__unrender)
})