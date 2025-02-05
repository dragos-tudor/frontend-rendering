import { assertEquals } from "/asserts.ts"
import { buildJsxFactoryChildren } from "./building.js"

Deno.test("use jsx expressions => build jsx factory children", async (t) => {

  await t.step("jsx factory with elements => build jsx factory children => factory elements", () =>
  {
    const Test = () => <a></a>
    const factory = <Test></Test>
    assertEquals(buildJsxFactoryChildren(factory).map(x => x.type), ["a"])
  })

  await t.step("jsx factory with fragments as elements => build jsx factory children => factory fragments children", () =>
  {
    const Test = () => <><a></a><b></b></>
    const factory = <Test></Test>
    assertEquals(buildJsxFactoryChildren(factory).map(x => x.type), ["a", "b"])
  })

  await t.step("jsx factory with fragments as children => build jsx factory children => factory fragments children", () =>
  {
    const Test = (props) => <>{props.children}</>
    const factory = <Test>{<><a></a><b></b></>}</Test>
    assertEquals(buildJsxFactoryChildren(factory).map(x => x.type), ["a", "b"])
  })

})
