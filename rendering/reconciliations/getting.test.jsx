import { assertEquals } from "/asserts.ts"
import { getReconciliationType, ReconciliationTypes } from "./getting.js"
import { parseHtml, registerLinkeDomParser } from "../../rendering-html/mod.js"
import { storeJsxElement } from "../../rendering-jsx/mod.js";

await registerLinkeDomParser()
const C = () => <></>

Deno.test("use reconciliations", async (t) =>
{
  await t.step("jsx elem and no html elem => get reconciliation type => render", () => {
    assertEquals(getReconciliationType(<b></b>, null), ReconciliationTypes.render)
  })

  await t.step("html elem and no jsx elem => get reconciliation type => unrender", () => {
    assertEquals(getReconciliationType(null, parseHtml("<a></a>")), ReconciliationTypes.unrender)
  })

  await t.step("different html and jsx elem names => get reconciliation type => replace", () => {
    assertEquals(getReconciliationType(<b></b>, parseHtml("<a></a>")), ReconciliationTypes.replace)
  })

  await t.step("equal html and jsx elem names => get reconciliation type => update", () => {
    assertEquals(getReconciliationType(<a></a>, parseHtml("<a></a>")), ReconciliationTypes.update)
  })

  await t.step("equal html and jsx factories props => get reconciliation type => skip", () => {
    const $elem = parseHtml("<c></c>")
    const elem = storeJsxElement($elem, <C></C>)
    assertEquals(getReconciliationType(elem, $elem), ReconciliationTypes.skip)
  })

  await t.step("equal html and no-skip jsx factories props => get reconciliation type => update", () => {
    const $elem = parseHtml("<c></c>")
    storeJsxElement($elem, <C no-skip></C>)
    assertEquals(getReconciliationType(<C no-skip></C>, $elem), ReconciliationTypes.update)
  })

  await t.step("different html and jsx factories props => get reconciliation type => update", () => {
    const $elem = parseHtml("<c></c>")
    storeJsxElement($elem, <C prop={1}></C>)
    assertEquals(getReconciliationType(<C prop={2}></C>, $elem), ReconciliationTypes.update)
  })

  await t.step("equal html and jsx texts => get reconciliation type => skip", () => {
    assertEquals(getReconciliationType((<a>123</a>).props.children, parseHtml("<a>123</a>").childNodes[0]), ReconciliationTypes.skip)
  })

  await t.step("different html and jsx texts => get reconciliation type => update", () => {
    assertEquals(getReconciliationType((<a>123</a>).props.children, parseHtml("<a>124</a>").childNodes[0]), ReconciliationTypes.update)
  })
})