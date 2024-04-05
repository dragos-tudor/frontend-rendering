import { assertEquals, assertExists } from "/asserts.ts"
import { render, update } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { Suspense } from "./Suspense.jsx"

await registerDOMParser()

Deno.test("watch operations progress => use suspenses", async (t) =>
{
  await t.step("unsuspending state => render suspense => children visible", () => {
    const actual = render(<Suspense suspending={false} fallback={<fbk></fbk>}><child></child></Suspense>)

    assertEquals(actual.querySelector("child").hasAttribute("hidden"), false)
  })

  await t.step("unsuspending state => render suspense => fallback hidden", () => {
    const actual = render(<Suspense suspending={false} fallback={<fbk></fbk>}><child></child></Suspense>)

    assertEquals(actual.querySelector("fbk").hasAttribute("hidden"), true)
  })

  await t.step("suspending state => render suspense => children hidden", () => {
    const actual = render(<Suspense suspending={true} fallback={<fbk></fbk>}><child1></child1><child2></child2></Suspense>)

    assertEquals(actual.querySelector("child1").hasAttribute("hidden"), true)
    assertEquals(actual.querySelector("child2").hasAttribute("hidden"), true)
  })

  await t.step("suspending state => render suspense => fallback visible", () => {
    const actual = render(<Suspense suspending={true} fallback={<fbk></fbk>}><child></child></Suspense>)

    assertEquals(actual.querySelector("fbk").hasAttribute("hidden"), false)
  })

  await t.step("unsuspending state => update suspended suspense => children visible", () => {
    const actual = render(<Suspense suspending={true} fallback={<fbk></fbk>}><child1></child1><child2></child2></Suspense>)
    update(actual, <Suspense suspending={false} fallback={<fbk></fbk>}><child1></child1></Suspense>)

    assertEquals(actual.querySelector("child1").hasAttribute("hidden"), false)
    assertExists(!actual.querySelector("child2"))
  })

  await t.step("unsuspending state => update suspended suspense => fallback hidden", () => {
    const actual = render(<Suspense suspending={true} fallback={<fbk></fbk>}><child></child></Suspense>)
    update(actual, <Suspense suspending={false} fallback={<fbk></fbk>}><child></child></Suspense>)

    assertEquals(actual.querySelector("fbk").hasAttribute("hidden"), true)
  })

})
