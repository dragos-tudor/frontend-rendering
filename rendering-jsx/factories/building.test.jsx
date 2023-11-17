import { assertEquals } from "/asserts.ts"
import { buildJsxFactoryChildren } from "./building.js"

Deno.test("use jsx expressions => build jsx factories", async (t) => {

  await t.step("jsx factory with children => build jsx factory => factory children", () => {
    const Test = () => <test></test>
    const factory = <Test></Test>
    assertEquals(buildJsxFactoryChildren(factory).map(x => x.type), ["test"])
  })

  await t.step("jsx factory with fragments => build jsx factory => factory fragment children", () => {
    const Test = () => <><test></test><test></test></>
    const factory = <Test></Test>
    assertEquals(buildJsxFactoryChildren(factory).map(x => x.type), ["test", "test"])
  })

})
