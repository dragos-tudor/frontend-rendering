import { assertObjectMatch } from "/asserts.ts"
import { setProps } from "./setting.js"

Deno.test("use html components => set prop values", async (t) =>
{
  await t.step("element with props => set prop values => element with prop values", () => {
    assertObjectMatch(setProps({className: undefined}, {class: 1}, ["class"]), {className: 1})
    assertObjectMatch(setProps({className: undefined}, {class: true}, ["class"]), {className: true})
    assertObjectMatch(setProps({className: undefined}, {class: "a"}, ["class"]), {className: "a"})
  })

  await t.step("element and toggle props => set prop values => element with toggle prop values", () => {
    assertObjectMatch(setProps({checked: undefined}, {checked: true}, ["checked"]), {checked: true})
    assertObjectMatch(setProps({disabled: undefined}, {disabled: false}, ["disabled"]), {disabled: false})
    assertObjectMatch(setProps({hidden: undefined}, {hidden: true}, ["hidden"]), {hidden: true})
    assertObjectMatch(setProps({readOnly: undefined}, {readonly: false}, ["readonly"]), {readOnly: false})
    assertObjectMatch(setProps({selected: undefined}, {selected: true}, ["selected"]), {selected: true})
  })

  await t.step("element and empty toggle props => set prop values => element with default toggle prop values", () => {
    assertObjectMatch(setProps({checked: undefined}, {checked: undefined}, ["checked"]), {checked: true})
    assertObjectMatch(setProps({disabled: undefined}, {disabled: undefined}, ["disabled"]), {disabled: true})
    assertObjectMatch(setProps({hidden: undefined}, {hidden: undefined}, ["hidden"]), {hidden: true})
    assertObjectMatch(setProps({readOnly: undefined}, {readonly: undefined}, ["readonly"]), {readOnly: true})
    assertObjectMatch(setProps({selected: undefined}, {selected: undefined}, ["selected"]), {selected: true})
  })

  await t.step("element and html property => set prop values => element with encoded inner html property", () => {
    assertObjectMatch(setProps({innerHTML: undefined}, {html: "<div></div>"}, ["html"]), {innerHTML: "&#60;div&#62;&#60;&#47;div&#62;"})
  })

  await t.step("element with style prop => set style prop values => element with style prop values", () => {
    assertObjectMatch(setProps({style: {}}, {style: {backgroundColor: "red"}}, ["style"]), {style: {backgroundColor: "red"}})
  })

  await t.step("element without props => set prop values => element without prop values", () => {
    assertObjectMatch(setProps({}, {class: 1}, ["class"]), {})
  })

  await t.step("element without props => set props => nothing should happend", () => {
    assertObjectMatch(setProps({}, {}, []), {})
  })
})