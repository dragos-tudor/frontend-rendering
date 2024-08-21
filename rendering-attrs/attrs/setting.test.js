import { assertObjectMatch } from "/asserts.ts"
import { setHtmlAttrs } from "./setting.js"

Deno.test("use html components => set html attrs values", async (t) =>
{
  await t.step("html element and attrs => set html element attrs values => element with attr values", () =>
  {
    const elem = createTestElement()
    assertObjectMatch(setHtmlAttrs(elem, {name: "value"}), {attributes: {"attr-name": "value"}})
  })

  await t.step("html element and func attr => set html element attr value => element without func attr", () =>
  {
    const elem = createTestElement()
    assertObjectMatch(setHtmlAttrs(elem, {func: () => {}}), {attributes: {}})
  })

  await t.step("html element and evemt attr => set html element attr value => element without event attr", () =>
  {
    const elem = createTestElement()
    assertObjectMatch(setHtmlAttrs(elem, {onclick: "javascript:alert(1)"}), {attributes: {}})
  })

  await t.step("html element and xmlns attr => set html element attr value => element without xmlns attr", () =>
  {
    const elem = createTestElement()
    assertObjectMatch(setHtmlAttrs(elem, {xmlns: "http://www.w3.org/1999/xhtml"}), {attributes: {}})
  })

  await t.step("html element with svg prop and svg attr => set html element attr value => element with svg attr value", () =>
  {
    function SVGViewBox(){ return this; }
    const elem = createTestElement({viewBox: new SVGViewBox()})
    assertObjectMatch(setHtmlAttrs(elem, {viewBox: "0 0 48 48"}), {attributes: {"attr-viewBox": "0 0 48 48"}})
  })
})

const createTestElement = (props = {}) => ({...props, attributes: {}, setAttributeNS: function (_, name, value) { this.attributes["attr-" + name] = value} })