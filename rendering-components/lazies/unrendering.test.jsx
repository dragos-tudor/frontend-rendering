import { assertEquals } from "/asserts.ts"
import { render, unrender } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { Lazy } from "./Lazy.js"

await registerDOMParser()

Deno.test("use code splitting => unrender lazy components", async (t) => {

  const A = (props) => <>{props.value}</>

  await t.step("rendered lazy component => unrender lazy component => lazy component unrendered", async () => {
    const actual = render(<Lazy value={1} loader={() => Promise.resolve(A) } ></Lazy>)
    await waitForAsyncs()

    unrender(actual.querySelector("a"))
    assertEquals(actual.outerHTML, "<lazy></lazy>")
  })

  await t.step("rendered lazy => unrender lazy => lazy unrendered", async () => {
    const actual = render(<Lazy value={1} loader={() => Promise.resolve(A) } ></Lazy>)
    await waitForAsyncs()

    unrender(actual)
    assertEquals(actual.parentElement, null)
  })

})

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))