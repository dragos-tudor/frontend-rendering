import { assertObjectMatch } from "/asserts.ts"
import { setHtmlProps } from "./setting.js"

Deno.test("use html components => set html prop values", async (t) =>
{
  await t.step("html element and props => set html element props values => element with props values", () => {
    assertObjectMatch(setHtmlProps({className: undefined}, {class: 1}), {className: 1})
    assertObjectMatch(setHtmlProps({className: undefined}, {class: true}), {className: true})
    assertObjectMatch(setHtmlProps({className: undefined}, {class: "a"}), {className: "a"})
  })

  await t.step("html element and toggle props => set html element props values => element with toggle props values", () => {
    assertObjectMatch(setHtmlProps({checked: undefined}, {checked: true}), {checked: true})
    assertObjectMatch(setHtmlProps({disabled: undefined}, {disabled: false}), {disabled: false})
    assertObjectMatch(setHtmlProps({hidden: undefined}, {hidden: true}), {hidden: true})
    assertObjectMatch(setHtmlProps({readOnly: undefined}, {readonly: false}), {readOnly: false})
    assertObjectMatch(setHtmlProps({selected: undefined}, {selected: true}), {selected: true})
  })

  await t.step("html element and empty toggle props => set html element props values => element with default toggle prop values", () => {
    assertObjectMatch(setHtmlProps({checked: undefined}, {checked: undefined}), {checked: true})
    assertObjectMatch(setHtmlProps({disabled: undefined}, {disabled: undefined}), {disabled: true})
    assertObjectMatch(setHtmlProps({hidden: undefined}, {hidden: undefined}), {hidden: true})
    assertObjectMatch(setHtmlProps({readOnly: undefined}, {readonly: undefined}), {readOnly: true})
    assertObjectMatch(setHtmlProps({selected: undefined}, {selected: undefined}), {selected: true})
  })

  await t.step("html element and html prop => set html element props values => element with encoded inner html prop", () => {
    assertObjectMatch(setHtmlProps({innerHTML: undefined}, {html: "<div></div>"}), {innerHTML: "&#60;div&#62;&#60;&#47;div&#62;"})
  })

  await t.step("html element and style prop => set html element props values => element with style props values", () => {
    assertObjectMatch(setHtmlProps({style: {}}, {style: {backgroundColor: "red"}}), {style: {backgroundColor: "red"}})
  })

  await t.step("html style element and css prop => set html element props values => element with inner html props values", () => {
    assertObjectMatch(setHtmlProps({innerHTML: {}}, {css: {backgroundColor: "red"}}, "style"), {innerHTML: {backgroundColor: "red"}})
  })

  await t.step("html element and internal props => set html element props values => element with internal props values", () => {
    assertObjectMatch(setHtmlProps({}, {__test: 1}), {__test: 1})
  })

  await t.step("html element and reserved props => set html element props values => nothing happend", () => {
    assertObjectMatch(setHtmlProps({children: undefined}, {children: 1}), {children: undefined})
  })

  await t.step("html element and events props => set html element props values  => nothing happend", () => {
    assertObjectMatch(setHtmlProps({onclick: undefined}, {onclick: 1}), {onclick: undefined})
  })

  await t.step("html element and unsafe props => set html element props values  => nothing happend", () => {
    assertObjectMatch(setHtmlProps({css: undefined}, {css: 1}), {css: undefined})
    assertObjectMatch(setHtmlProps({innerHTML: undefined}, {innerHTML: 1}), {innerHTML: undefined})
    assertObjectMatch(setHtmlProps({outerHTML: undefined}, {outerHTML: 1}), {outerHTML: undefined})
  })

  await t.step("html element and url props => set html element props with unsafe url values => nothing happend", () => {
    assertObjectMatch(setHtmlProps({src: undefined}, {src: "javascript:alert('1')"}), {src: undefined})
  })

  await t.step("html element without props => set html element props values  => element without prop values", () => {
    assertObjectMatch(setHtmlProps({}, {}), {})
    assertObjectMatch(setHtmlProps({}, {class: 1}), {})
  })
})