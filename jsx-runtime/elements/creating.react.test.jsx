/** @jsxImportSource  /react */
import { assertEquals } from "/asserts.ts"


Deno.test("use jsx expressions => create jsx elements [react]", async (t) => {

  await t.step("jsx element expression => create jsx element => type have jsx element name [react]", () => {
    assertEquals((<test></test>).type, "test")
    assertEquals((<test><nested></nested></test>).props.children.type, "nested")
    assertEquals((<test><nested></nested><nested1></nested1></test>).props.children[1].type, "nested1")
  })

  await t.step("jsx factory expression => create jsx element => type is factory function [react]", () => {
    const Test = () => <></>
    assertEquals((<Test></Test>).type, Test)
    assertEquals((<test><Test></Test></test>).props.children.type, Test)
    assertEquals((<test><nested></nested><Test></Test></test>).props.children[1].type, Test)
  })

  await t.step("jsx fragment expression => create jsx element => type is fragment symbol [react]", () => {
    const symbol = Symbol.for("react.fragment")
    assertEquals((<></>).type, symbol)
    assertEquals((<test><></></test>).props.children.type, symbol)
    assertEquals((<test><nested></nested><></></test>).props.children[1].type, symbol)
  })

  await t.step("jsx element expression with props => create jsx element => element props have expression props values [react]", () => {
    assertEquals((<test x={1}></test>).props, {x: 1})
    assertEquals((<test><nested x={1}></nested></test>).props.children.props, {x: 1})
    assertEquals((<test><nested></nested><nested x={1}></nested></test>).props.children[1].props, {x: 1})
  })

  await t.step("jsx element expression with key prop => create jsx element => element props without key [react]", () => {
    const props = { key: 1 }
    assertEquals((<test {...props}></test>).props, {})
    assertEquals((<test key={1}></test>).props, {})
  })

  await t.step("jsx element expression with key prop => create jsx element => key on element [react]", () => {
    const props = { key: 1 }
    assertEquals((<test {...props}></test>).key, "1")
    assertEquals((<test key={1}></test>).key, "1")
  })

  await t.step("jsx factory expression with factory default prop => create jsx element => element prop have default prop [react]", () => {
    const Test = () => <></>
    Test.defaultProps = {a: 1}
    assertEquals((<Test></Test>).props, {a: 1})
  })

  await t.step("jsx factory expression with prop and factory default prop => create jsx element => element prop have expression prop [react]", () => {
    const Test = () => <></>
    Test.defaultProps = {a: 1}
    assertEquals((<Test a={2}></Test>).props, {a: 2})
  })

  await t.step("jsx element expression with ref prop => create jsx element => element props without ref [react]", () => {
    const props = { ref: 1 }
    assertEquals((<test {...props}></test>).props, {})
    assertEquals((<test ref={1}></test>).props, {})
  })

  await t.step("jsx element expression with ref prop => create jsx element => ref on element [react]", () => {
    const props = { ref: 1 }
    assertEquals((<test {...props}></test>).ref, 1)
    assertEquals((<test ref={1}></test>).ref, 1)
  })

})