import { assertEquals, assertArrayIncludes as eq } from "/asserts.ts"
import { useState } from "./using.js"

Deno.test("use component states => use states", async (t) => {

  await t.step("no state => use state => state with value", () => {
    eq(useState({}, "", 1), [1])
    eq(useState({}, "", 1, []),  [1])
    eq(useState({}, "", 1, [undefined]), [1])
  })

  await t.step("equal state deps => use state twice => state with first value", () => {
    const states = {}
    eq((useState(states, "a", 1, []), useState(states, "a", 2, [])), [1])
    eq((useState(states, "b", 1, ["x"]), useState(states, "b", 2, ["x"])), [1])
  })

  await t.step("not equal state deps => use state twice => state with second value", () => {
    const states = {}
    eq((useState(states, "a", 1, []), useState(states, "a", 2, ["x"])), [2])
    eq((useState(states, "b", 1, ["x"]), useState(states, "b", 2, [undefined])), [2])
    eq((useState(states, "c", 1, ["x"]), useState(states, "c", 2, [])), [2])
  })

  await t.step("no state deps => use state twice => state with second value", () => {
    const states = {}
    eq((useState(states, "a", 1), useState(states, "a", 2)), [2])
    eq((useState(states, "b", 1), useState(states, "b", 2)), [2])
  })

  await t.step("use state => set state value => state value is set", () => {
    const states = {}
    const [, setState ] = useState(states, "", 1)
    setState(2)
    assertEquals(states[""].value, 2)
  })

})