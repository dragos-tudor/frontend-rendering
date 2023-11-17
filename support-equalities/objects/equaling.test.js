import { assertEquals as eq } from "/asserts.ts"
import { equalObjects } from "./equaling.js"

Deno.test("skip updating => verify objects equality", async (t) => {

  await t.step("equal objects => verify equality => 'true'", () => {
    eq(equalObjects(null, null), true)
    eq(equalObjects(undefined, undefined), true)
    eq(equalObjects({}, {}), true)
    eq(equalObjects({x: 1}, {x: 1}), true)
    eq(equalObjects({x: 1, y: {z: 2}}, {x: 1, y: {z: 2}}), true)
    eq(equalObjects([{x: 1, y: true, z: "a"}], [{x: 1, y: true, z: "a"}]), true)
    eq(equalObjects({x: 1, f: () => {}}, {x: 1, f: () => {}}), true)
    eq(equalObjects({x: {y: {z: 1}}}, {x: {y: {z: 1}}}), true)
    eq(equalObjects({x: {y: ["a", true]}}, {x: {y: ["a", true]}}), true)
    eq(equalObjects({children: 1}, {children: 2}), true)
  })

  await t.step("different objects => verify equality => 'false'", () => {
    eq(equalObjects(null, undefined), false)
    eq(equalObjects(undefined, null), false)
    eq(equalObjects(null, {}), false)
    eq(equalObjects(undefined, {}), false)
    eq(equalObjects({x: 1}, {}), false)
    eq(equalObjects({}, {x: 1}), false)
    eq(equalObjects({x: 1}, {x: "1"}), false)
    eq(equalObjects({x: 1, y: {z: 2}}, {x: 1, y: {z: 3}}), false)
    eq(equalObjects({x: {y: {z: 1}}}, {x: {y: {z: 3}}}), false)
    eq(equalObjects({x: {y: ["a", true]}}, {x: {y: ["a", false]}}), false)
    eq(equalObjects({x: 1, y: undefined}, {y: undefined}), false)
  })

})
