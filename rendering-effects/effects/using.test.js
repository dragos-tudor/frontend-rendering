import { assertEquals as eq } from "/asserts.ts"
import { setInitialEffect } from "./setting.js"
import { useEffect } from "./using.js"

Deno.test("use component effects => use effects", async (t) => {

  await t.step("no effect => use effect => func run", () => {
    eq(useEffect({}, "", () => 1), 1)
    eq(useEffect({}, "", () => 1, []),  1)
    eq(useEffect({}, "", () => 1, [undefined]), 1)
  })

  await t.step("equal deps => use effect twice => second time func not run", () => {
    const efects = {}
    eq((useEffect(efects, "a", () => 1, []), useEffect(efects, "a", () => 2, [])), undefined)
    eq((useEffect(efects, "b", () => 1, ["x"]), useEffect(efects, "b", () => 2, ["x"])), undefined)
  })

  await t.step("not equal deps => use effect twice => second time func run", () => {
    const effects = {}
    eq((useEffect(effects, "a", () => 1, []), useEffect(effects, "a", () => 2, ["x"])), 2)
    eq((useEffect(effects, "b", () => 1, ["x"]), useEffect(effects, "b", () => 2, [undefined])), 2)
    eq((useEffect(effects, "c", () => 1, ["x"]), useEffect(effects, "c", () => 2, [])), 2)
  })

  await t.step("no sdeps => use effect twice => second time func run", () => {
    const effects = {}
    eq((useEffect(effects, "a", () => 1), useEffect(effects, "a", () => 2)), 2)
    eq((useEffect(effects, "b", () => 1), useEffect(effects, "b", () => 2)), 2)
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


  await t.step("effect with initial func => use effect => second time initial func run before func", () => {
    const effects = {}
    const spies = []
    useEffect(effects, "a", () => setInitialEffect(effects, "a", () => spies.push(1)))
    useEffect(effects, "a", () => spies.push(2))

    eq(spies, [1, 2])
  })

  await t.step("effect with inital func => use effect twice => second time initial func not run", () => {
    const effects = {}
    const spies = []
    useEffect(effects, "a", () => setInitialEffect(effects, "a", () => spies.push(1)))
    useEffect(effects, "a", () => spies.push(2))
    useEffect(effects, "a", () => spies.push(3))

    eq(spies, [1, 2, 3])
  })

})