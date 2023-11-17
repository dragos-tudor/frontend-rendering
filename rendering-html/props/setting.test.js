import { assertObjectMatch } from "/asserts.ts"
import { setHtmlProperties } from "./setting.js"

Deno.test("use html components => set html property values", async (t) => {

  await t.step("element with html properties => set prop values => element with prop values", () => {
    assertObjectMatch(setHtmlProperties({className: undefined}, {class: 1}), {className: 1})
    assertObjectMatch(setHtmlProperties({className: undefined}, {class: true}), {className: true})
    assertObjectMatch(setHtmlProperties({className: undefined}, {class: "a"}), {className: "a"})
  })

  await t.step("element without html properties => set prop values => element without prop values", () => {
    assertObjectMatch(setHtmlProperties({}, {class: 1}), {})
  })

  await t.step("element without properties => set properties => nothing should happend", () => {
    assertObjectMatch(setHtmlProperties({}, {}), {})
  })

  await t.step("element and toggle properties => set prop values => element with toggle prop values", () => {
    assertObjectMatch(setHtmlProperties({checked: undefined}, {checked: true}), {checked: true})
    assertObjectMatch(setHtmlProperties({disabled: undefined}, {disabled: false}), {disabled: false})
    assertObjectMatch(setHtmlProperties({hidden: undefined}, {hidden: true}), {hidden: true})
    assertObjectMatch(setHtmlProperties({readOnly: undefined}, {readOnly: false}), {readOnly: false})
    assertObjectMatch(setHtmlProperties({selected: undefined}, {selected: true}), {selected: true})
  })

  await t.step("element and empty toggle properties => set prop values => element with default toggle prop values", () => {
    assertObjectMatch(setHtmlProperties({checked: undefined}, {checked: undefined},), {checked: true})
    assertObjectMatch(setHtmlProperties({disabled: undefined}, {disabled: undefined}), {disabled: true})
    assertObjectMatch(setHtmlProperties({hidden: undefined}, {hidden: undefined}), {hidden: true})
    assertObjectMatch(setHtmlProperties({readOnly: undefined}, {readOnly: undefined}), {readOnly: true})
    assertObjectMatch(setHtmlProperties({selected: undefined}, {selected: undefined}), {selected: true})
  })


  await t.step("element and html property => set prop values => element with encoded inner html property", () => {
    assertObjectMatch(setHtmlProperties({innerHTML: undefined}, {html: "<div></div>"}), {innerHTML: "&#60;div&#62;&#60;&#47;div&#62;"})
  })

  await t.step("element and event handler properties => set prop values => element without event properties", () => {
    assertObjectMatch(setHtmlProperties({}, {onevent: () => {}}), {})
  })


})