import { assertEquals } from "/asserts.ts"
import { getHtmlName, parseHtml, registerLinkeDomParser } from "../../rendering-html/mod.js"
import { getJsxKey, getJsxElement, createJsxElement } from "../../rendering-jsx/mod.js"
import { render } from "../mod.js"
import { orderKeyElements } from "./ordering.js"

await registerLinkeDomParser()

Deno.test("use key elements => order key elements", async (t) => {

  const jsx = (key, type = "a") => createJsxElement(type, {}, key)
  const renderHtml = (elems, $parent) => elems.map(elem => render(elem, $parent))
  const orderKeys = (oldElems, newElems, $parent = parseHtml("<main></main>")) => orderKeyElements(newElems, renderHtml(oldElems, $parent), $parent)

  await t.step("key elements => order key elements => ordered key elements [keys]", () => {
    const getKeys = ($elems) => $elems.map(e => getJsxKey(getJsxElement(e) || {}))

    assertEquals(getKeys(orderKeys([],  [])), [])
    assertEquals(getKeys(orderKeys([],  [jsx(1)])), [])
    assertEquals(getKeys(orderKeys([jsx(1)],  [])), [1])
    assertEquals(getKeys(orderKeys([jsx(1)],  [jsx(1)])), [1])
    assertEquals(getKeys(orderKeys([jsx(1)],  [jsx(2)])), [undefined, 1])
    assertEquals(getKeys(orderKeys([jsx(2), jsx(1)],  [jsx(1)])), [1, 2])
    assertEquals(getKeys(orderKeys([jsx(2)],  [jsx(1), jsx(2)])), [undefined, 2])
    assertEquals(getKeys(orderKeys([jsx(2), jsx(1)],  [jsx(1), jsx(2)])), [1, 2])
    assertEquals(getKeys(orderKeys([jsx(1), jsx(2)],  [jsx(3)])), [undefined, 1, 2])
    assertEquals(getKeys(orderKeys([jsx(3)],  [jsx(2), jsx(1)])), [undefined, undefined, 3])
    assertEquals(getKeys(orderKeys([jsx(1), jsx(2), jsx(3)],  [jsx(3), jsx(2), jsx(4)])), [3, 2, undefined, 1])
  })

  await t.step("key elements => order key elements => ordered key elements [names]", () => {
    const getNames = ($elems) => $elems.map(getHtmlName)

    assertEquals(getNames(orderKeys([],  [])), [])
    assertEquals(getNames(orderKeys([],  [jsx(1)])), [])
    assertEquals(getNames(orderKeys([jsx(1)],  [])), ["a"])
    assertEquals(getNames(orderKeys([jsx(1, "a")],  [jsx(1, "a")])), ["a"])
    assertEquals(getNames(orderKeys([jsx(1, "a")],  [jsx(2, "a")])), ["text", "a"])
    assertEquals(getNames(orderKeys([jsx(2, "b"), jsx(1, "a")],  [jsx(1, "a")])), ["a", "b"])
    assertEquals(getNames(orderKeys([jsx(2, "b")],  [jsx(1, "a"), jsx(2, "b")])), ["text", "b"])
    assertEquals(getNames(orderKeys([jsx(2, "b"), jsx(1, "a")],  [jsx(1, "a"), jsx(2, "b")])), ["a", "b"])
    assertEquals(getNames(orderKeys([jsx(1, "a"), jsx(2, "b")],  [jsx(3, "c")])), ["text", "a", "b"])
    assertEquals(getNames(orderKeys([jsx(3, "c")],  [jsx(2, "b"), jsx(1, "a")])), ["text", "text", "c"])
    assertEquals(getNames(orderKeys([jsx(1, "a"), jsx(2, "b"), jsx(3, "c")],  [jsx(3, "c"), jsx(2, "b"), jsx(4, "d")])), ["c", "b", "text", "a"])
  })

})
