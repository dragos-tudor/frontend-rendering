import { assertExists } from "/asserts.ts"
import { render } from "../../rendering/mod.js"
import { setEffects, useEffect } from "../../rendering-effects/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { Suspense } from "./Suspense.js"
import { suspense, unsuspense } from "./suspending.jsx"

await registerDOMParser()

Deno.test("watch operations progress => use suspenses", async (t) => {

  await t.step("unsuspended elem => render suspense => fallback not rendered", () => {
    const actual = render(<Suspense suspending={false} fallback={<b></b>}><a></a></Suspense>)

    assertExists(actual.querySelector("a"))
  })

  await t.step("suspended elem => render suspense => fallback rendered", () => {
    const actual = render(<Suspense suspending={true} fallback={<b></b>}><a></a></Suspense>)

    assertExists(actual.querySelector("b"))
  })

  await t.step("suspense from descendant => render suspense => fallback rendered", () => {
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => suspense(elem))
      return <></>
    }
    const actual = render(<Suspense suspending={false} fallback={<b></b>}><A></A></Suspense>)

    assertExists(actual.querySelector("b"))
  })

  await t.step("unsuspense from descendant => render suspense => fallback not rendered", () => {
    const A = () => <></>
    const B = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => unsuspense(elem));
      return <></> }
    const actual = render(<Suspense suspending={true} fallback={<B></B>}><A></A></Suspense>)

    assertExists(actual.querySelector("a"))
  })

})
