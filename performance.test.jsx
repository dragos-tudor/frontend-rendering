import { assert } from "/asserts.ts"
import { render, update, unrender, registerLinkeDomParser } from "./mod.js"

await registerLinkeDomParser()

Deno.test("use components => test rendering performance", async (t) => {

  const B = (props) => <c x={props.x} y={props.y}>{props.z}</c>
  const A = (props) => <>{props.children}</>

  await t.step("no elements => append 6000 elements => operation ran fast", () => {
    const start = performance.now()
    render(<A>{new Array(3000).fill(<B x={1} y={true} z={"abc"}></B>)}</A>)
    const end = performance.now()

    assert(end - start < 1000, "Slow performance appending 6000 html elements")
  })

  await t.step("4000 elements => update elements => operation ran fast", () => {
    const elem = render(<A>{new Array(2000).fill(<B x={1}></B>)}</A>)

    const start = performance.now()
    update(elem, <A>{new Array(2000).fill(<B x={2}></B>)}</A>)
    const end = performance.now()

    assert(end - start < 1000, "Slow performance updating 4000 html elements")
  })

  await t.step("6000 elements => remove elements => operation ran fast", () => {
    const elem = render(<A>{new Array(3000).fill(<B x={1}></B>)}</A>)
    const start = performance.now()
    unrender(elem)
    const end = performance.now()

    assert(end - start < 1000, "Slow performance removing 6000 html elements")
  })

})