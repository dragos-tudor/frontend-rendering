import { assertObjectMatch } from "/asserts.ts"
import { setProps } from "./setting.js"

Deno.test("use html components => set prop values", async (t) =>
{
  await t.step("element with props => set element props values => element with props values", () => {
    assertObjectMatch(setProps({className: undefined}, {class: 1}), {className: 1})
    assertObjectMatch(setProps({className: undefined}, {class: true}), {className: true})
    assertObjectMatch(setProps({className: undefined}, {class: "a"}), {className: "a"})
  })

  await t.step("element and toggle props => set element props values => element with toggle props values", () => {
    assertObjectMatch(setProps({checked: undefined}, {checked: true}), {checked: true})
    assertObjectMatch(setProps({disabled: undefined}, {disabled: false}), {disabled: false})
    assertObjectMatch(setProps({hidden: undefined}, {hidden: true}), {hidden: true})
    assertObjectMatch(setProps({readOnly: undefined}, {readonly: false}), {readOnly: false})
    assertObjectMatch(setProps({selected: undefined}, {selected: true}), {selected: true})
  })

  await t.step("element and empty toggle props => set element props values => element with default toggle prop values", () => {
    assertObjectMatch(setProps({checked: undefined}, {checked: undefined}), {checked: true})
    assertObjectMatch(setProps({disabled: undefined}, {disabled: undefined}), {disabled: true})
    assertObjectMatch(setProps({hidden: undefined}, {hidden: undefined}), {hidden: true})
    assertObjectMatch(setProps({readOnly: undefined}, {readonly: undefined}), {readOnly: true})
    assertObjectMatch(setProps({selected: undefined}, {selected: undefined}), {selected: true})
  })

  await t.step("element and html property => set element props values => element with encoded inner html prop", () => {
    assertObjectMatch(setProps({innerHTML: undefined}, {html: "<div></div>"}), {innerHTML: "&#60;div&#62;&#60;&#47;div&#62;"})
  })

  await t.step("element with style prop => set element props values => element with style props values", () => {
    assertObjectMatch(setProps({style: {}}, {style: {backgroundColor: "red"}}), {style: {backgroundColor: "red"}})
  })

  await t.step("element style with innerHTML prop => set element props values => element with innerHTML props values", () => {
    assertObjectMatch(setProps({innerHTML: {}}, {css: {backgroundColor: "red"}}, "style"), {innerHTML: {backgroundColor: "red"}})
  })

  await t.step("element without props => set element props values => element with internal props values", () => {
    assertObjectMatch(setProps({}, {__test: 1}), {__test: 1})
  })

  await t.step("element with reserved props => set element props values => nothing happend", () => {
    assertObjectMatch(setProps({children: undefined}, {children: 1}), {children: undefined})
  })

  await t.step("element with event names => set element props values  => nothing happend", () => {
    assertObjectMatch(setProps({onclick: undefined}, {onclick: 1}), {onclick: undefined})
  })

  await t.step("element with unsafe props => set element props values  => nothing happend", () => {
    assertObjectMatch(setProps({css: undefined}, {css: 1}), {css: undefined})
    assertObjectMatch(setProps({innerHTML: undefined}, {innerHTML: 1}), {innerHTML: undefined})
    assertObjectMatch(setProps({outerHTML: undefined}, {outerHTML: 1}), {outerHTML: undefined})
  })

  await t.step("element with url props => set elem props with unsafe url values => nothing happend", () => {
    assertObjectMatch(setProps({src: undefined}, {src: "javascript:alert('1')"}), {src: undefined})
  })

  await t.step("element without props => set element props values  => element without prop values", () => {
    assertObjectMatch(setProps({}, {class: 1}), {})
  })

  await t.step("element without props => set element props values  => nothing happend", () => {
    assertObjectMatch(setProps({}, {}), {})
  })
})