import { assertEquals, assertArrayIncludes as eq } from "/asserts.ts"
import { useMemo } from "./using.js"

Deno.test("use component states => use memo", async (t) => {

  const func1 = () => 1
  const func2 = () => 2

  await t.step("empty memo => use memo => memo with func result", () => {
    eq(useMemo({}, "", func1), [1])
    eq(useMemo({}, "", func1, []),  [1])
    eq(useMemo({}, "", func1, [undefined]), [1])
  })

  await t.step("equal memo deps => use func twice => state with first func result", () => {
    const states = {}
    eq((useMemo(states, "a", func1, []), useMemo(states, "a", func2, [])), [1])
    eq((useMemo(states, "b", func1, ["x"]), useMemo(states, "b", func2, ["x"])), [1])
  })

  await t.step("not equal memo deps => use func twice => state with second func result", () => {
    const states = {}
    eq((useMemo(states, "a", func1, []), useMemo(states, "a", func2, ["x"])), [2])
    eq((useMemo(states, "b", func1, ["x"]), useMemo(states, "b", func2, [undefined])), [2])
    eq((useMemo(states, "c", func1, ["x"]), useMemo(states, "c", func2, [])), [2])
  })

  await t.step("no memo deps => use func twice => state with second func result", () => {
    const states = {}
    eq((useMemo(states, "a", func1), useMemo(states, "a", func2)), [2])
    eq((useMemo(states, "b", func1), useMemo(states, "b", func2)), [2])
  })

  await t.step("use memo => set func value => state value is set", () => {
    const states = {}
    const [, setState ] = useMemo(states, "", func1)
    setState(func2)
    assertEquals(states[""].value, 2)
  })

})