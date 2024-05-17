import { assertEquals as eq } from "/asserts.ts"
import { equalArrays } from "./equaling.js"

Deno.test("skip updating => verify arrays equality", async (t) => {

  await t.step("equal arrays => verify equality => 'true'", () => {
    eq(equalArrays(undefined, undefined), true)
    eq(equalArrays(null, null), true)
    eq(equalArrays([], []), true)
    eq(equalArrays([1], [1]), true)
    eq(equalArrays([{x: 1}], [{x: 1}]), true)
    eq(equalArrays([1, true, "a"], [1, true, "a"]), true)
  })

  await t.step("different arrays => verify equality => 'false'", () => {
    eq(equalArrays(null, undefined), false)
    eq(equalArrays(undefined, null), false)
    eq(equalArrays([1], []), false)
    eq(equalArrays([], [1]), false)
    eq(equalArrays([1], ["1"]), false)
    eq(equalArrays([1, 2, 3], [1, 2, "3"]), false)
    eq(equalArrays([{x: 1}], [{}]), false)
    eq(equalArrays([{x: 1}], [{x: "1"}]), false)
  })

})