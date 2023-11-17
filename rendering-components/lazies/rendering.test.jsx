import { assertEquals } from "/asserts.ts"
import { render } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { Lazy } from "./Lazy.js"

await registerDOMParser()

Deno.test("use code splitting => render lazy components", async (t) => {

  const A = (props) => <>{props.value}</>
  const B = (props) => <>{props.children}</>

  await t.step("lazy component with props values => render lazy => lazy component rendered with values", async () => {
    const actual = render(<Lazy value={1} loader={() => Promise.resolve(A)} ></Lazy>)

    await waitForAsyncs()
    assertEquals(actual.outerHTML, "<lazy><a>1</a></lazy>")
  })

  await t.step("lazy component with children => render lazy => lazy component rendered with children", async () => {
    const actual = render(<Lazy loader={() => Promise.resolve(B)} ><c></c></Lazy>)

    await waitForAsyncs()
    assertEquals(actual.outerHTML, "<lazy><b><c></c></b></lazy>")
  })

  await t.step("nested lazy component with props values => render lazy => lazy component rendered with values", async () => {
    const actual = render(<c><Lazy value={1} loader={() => Promise.resolve(A)} ></Lazy></c>)

    await waitForAsyncs()
    assertEquals(actual.innerHTML, "<lazy><a>1</a></lazy>")
  })

})

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))
