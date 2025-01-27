// deno-lint-ignore-file no-global-assign
/** @jsxImportSource  /react */
import { assert } from "/asserts.ts"
import { render } from "/react-testing.js"
import { registerLinkeDomParser } from "./mod.js"

await registerLinkeDomParser()
window = globalThis

Deno.test("use components => test rendering performance [react]", async (t) =>
{
  const getDocument = () => new DOMParser().parseFromString("<body><main></main></body>", "text/html")
  const B = (props) => <c x={props.x} $y={props.y}>{props.z}</c>
  const A = (props) => <>{props.children}</>

  await t.step("no elements => append 3000 elements => operation ran fast [react]", () =>
  {
    const root = getDocument()
    const container = root.querySelector("main")

    const start = performance.now()
    render(<A>{new Array(3000).fill(0).map((_, index) => <B key={index} x={1} $y={true} z={"abc"}></B>)}</A>, {container})
    const end = performance.now()

    assert(end - start < 1000, "Slow performance appending 3000 html elements")
  })

  await t.step("2000 elements => update elements => operation ran fast [react]", () =>
  {
    const root = getDocument()
    const container = root.querySelector("main")
    const screen = render(<A>{new Array(2000).fill(0).map((_, index) => <B key={index} x={1}></B>)}</A>, {container})

    const start = performance.now()
    screen.rerender(<A>{new Array(2000).fill(0).map((_, index) => <B key={index} x={2}></B>)}</A>, {container})
    const end = performance.now()

    assert(end - start < 1000, "Slow performance updating 2000 html elements")
  })

  await t.step("3000 elements => remove elements => operation ran fast [react]", () =>
  {
    const root = getDocument()
    const container = root.querySelector("main")
    const screen = render(<A>{new Array(3000).fill(0).map((_, index) => <B key={index} x={1}></B>)}</A>, {container})

    const start = performance.now()
    screen.rerender(<A></A>, {container})
    const end = performance.now()

    assert(end - start < 1000, "Slow performance removing 3000 html elements")
  })
})