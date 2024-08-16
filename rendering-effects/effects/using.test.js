import { assertEquals as eq } from "/asserts.ts"
import { useEffect } from "./using.js"

Deno.test("use component effects => use effects", async (t) =>
{
  await t.step("equal deps => use effect twice => effect func unset", () => {
    const effects = {}
    useEffect(effects, "a", console.log, []); useEffect(effects, "a", console.log, [])
    useEffect(effects, "b", console.log, ["x"]); useEffect(effects, "b", console.log, ["x"])

    eq(effects["a"].func, undefined)
    eq(effects["b"].func, undefined)
  })

  await t.step("not equal deps => use effect twice => effect func changed", () => {
    const effects = {}
    useEffect(effects, "a", console.log, []); useEffect(effects, "a", console.info, ["x"])
    useEffect(effects, "b", console.log, ["x"]); useEffect(effects, "b", console.info, [undefined])
    useEffect(effects, "c", console.log, ["x"]); useEffect(effects, "c", console.info, [])

    eq(effects["a"].func, console.info)
    eq(effects["b"].func, console.info)
    eq(effects["c"].func, console.info)
  })

  await t.step("no deps => use effect twice => effect func changed", () => {
    const effects = {}
    useEffect(effects, "a", console.log); useEffect(effects, "a", console.info)
    useEffect(effects, "b", console.log); useEffect(effects, "b", console.info)

    eq(effects["a"].func, console.info)
    eq(effects["b"].func, console.info)
  })

  await t.step("equal deps => use effect twice => deps not changed", () => {
    const effects = {}
    useEffect(effects, "a", () => 1, []), useEffect(effects, "a", () => 2, [])
    useEffect(effects, "b", () => 1, ["x"]), useEffect(effects, "b", () => 2, ["x"])

    eq(effects["a"].deps, [])
    eq(effects["b"].deps, ["x"])
  })

  await t.step("not equal deps => use effect twice => deps changed", () => {
    const effects = {}
    useEffect(effects, "a", () => 1, []), useEffect(effects, "a", () => 2, ["x"])
    useEffect(effects, "b", () => 1, ["x"]), useEffect(effects, "b", () => 2, [])

    eq(effects["a"].deps, ["x"])
    eq(effects["b"].deps, [])
  })

  await t.step("no deps => use effect twice => deps no changed", () => {
    const effects = {}
    useEffect(effects, "a", console.log); useEffect(effects, "a", console.log)

    eq(effects["a"].deps, undefined)
  })
})