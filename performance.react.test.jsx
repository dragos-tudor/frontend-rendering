/** @jsxImportSource  /react */
import { assert } from "/asserts.ts"
import { unstable_act as act } from "/react.js"
import { createRoot } from "/react-dom.js"
import { DOMLibraryUrl } from "./rendering-html/parsers/registering.js"


const dom = await import(DOMLibraryUrl)
Object.assign(globalThis, { ...dom, Event: globalThis.Event, EventTarget: globalThis.EventTarget})
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true})


Deno.test("use components => test rendering performance [react]", async (t) => {

  const getDocument = () => new DOMParser().parseFromString("<main></main>")
  const B = (props) => <c x={props.x} $y={props.y}>{props.z}</c>
  const A = (props) => <>{props.children}</>

  await t.step("no elements => append 3000 elements => operation ran fast [react]", async () => {
    const elem = getDocument().querySelector("main")
    const root = createRoot(elem)

    const start = performance.now()
    act(() => root.render(<A>{new Array(3000).fill(<B x={1} $y={true} z={"abc"}></B>)}</A>))
    await Promise.resolve()

    const end = performance.now()
    assert(end - start < 1000, "Slow performance appending 3000 html elements")
  })

  await t.step("2000 elements => update elements => operation ran fast [react]", async () => {

    const elem = getDocument().querySelector("main")
    const root = createRoot(elem)

    act(() => root.render(<A>{new Array(2000).fill(<B x={1}></B>)}</A>))
    await Promise.resolve()

    const start = performance.now()
    act(() => root.render(<A>{new Array(2000).fill(<B x={2}></B>)}</A>))
    await Promise.resolve()

    const end = performance.now()
    assert(end - start < 1000, "Slow performance updating 2000 html elements")
  })

  await t.step("3000 elements => remove elements => operation ran fast [react]", async () => {
    const elem = getDocument().querySelector("main")
    const root = createRoot(elem)

    act(() => root.render(<A>{new Array(3000).fill(<B x={1}></B>)}</A>))
    await Promise.resolve()

    const start = performance.now()
    act(() => root.render(<A></A>))
    await Promise.resolve()

    const end = performance.now()
    assert(end - start < 1000, "Slow performance removing 3000 html elements")
  })

})