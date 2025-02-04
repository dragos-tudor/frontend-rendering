import { assertEquals, assertExists } from "/asserts.ts"
import { render } from "../../rendering/mod.js"
import { registerLinkeDomParser } from "../../rendering-html/mod.js"
import { Lazy } from "./lazy.jsx"

await registerLinkeDomParser()

Deno.test("use code splitting => render lazy components", async (t) => {

  const A = (props) => <>{props.value}</>
  const B = (props) => <>{props.children}</>

  await t.step("lazy component with props values => render lazy => lazy component rendered with values", async () => {
    const actual = render(<Lazy value={1} loader={(props) =><A {...props}></A>}></Lazy>)

    await waitForAsyncs()
    assertEquals(actual.querySelector("lazy a").innerText, "1")
  })

  await t.step("lazy component with children => render lazy => lazy component rendered with children", async () => {
    const actual = render(<Lazy loader={(props) => <B>{props.children}</B>}><c></c></Lazy>)

    await waitForAsyncs()
    assertExists(actual.querySelector("lazy b c"))
  })

  await t.step("nested lazy component with props values => render lazy => lazy component rendered with values", async () => {
    const actual = render(<c><Lazy value={1} loader={(props) => <A {...props}></A>} ></Lazy></c>)

    await waitForAsyncs()
    assertEquals(actual.querySelector("lazy a").innerText, "1")
  })

})

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))
