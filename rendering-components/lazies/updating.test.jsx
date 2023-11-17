import { assertEquals } from "/asserts.ts"
import { spy, assertSpyCalls } from "/mock.ts"
import { render, update, unrender } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { Lazy } from "./Lazy.js"

await registerDOMParser()

Deno.test("use code splitting => update lazy components", async (t) => {

  const A = (props) => <>{props.value}</>
  const B = (props) => <>{props.children}</>

  await t.step("rendered lazy component => update lazy => lazy component updated", async () => {
    const actual = render(<Lazy value={1} loader={() => Promise.resolve(A) } ></Lazy>)
    await waitForAsyncs()

    update(actual, <Lazy value={2} loader={() => Promise.resolve(A)} ></Lazy>)
    assertEquals(actual.outerHTML, "<lazy><a>2</a></lazy>")
  })

  await t.step("rendered lazy component => update lazy => skip updatre lazy component", async () => {
    const actual = render(<c><Lazy loader={() => Promise.resolve(B) } ><d></d></Lazy></c>)
    await waitForAsyncs()

    update(actual, <b><Lazy loader={() => Promise.resolve(B)}><e></e></Lazy></b>)
    assertEquals(actual.innerHTML, "<lazy><b><d></d></b></lazy>")
  })

  await t.step("rendered lazy component => remove component and update lazy => lazy component loaded once", async () => {
    const spyLoader = spy(() => {})
    const elem = render(<Lazy loader={() => { spyLoader(); return Promise.resolve(A) }}></Lazy>)
    await waitForAsyncs()

    unrender(elem.querySelector("a"))
    update(elem, <Lazy loader={() => { spyLoader(); return Promise.resolve(A) }}></Lazy>)
    assertSpyCalls(spyLoader, 1)
  })

})

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))
