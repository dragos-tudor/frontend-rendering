import { bundle } from "/emit.ts"

const indexPath = new URL("./mod.js", import.meta.url)
const bundleOptions = { compilerOptions: { sourceMap: false } }
const bundleResult = await bundle(indexPath, bundleOptions)

const { code } = bundleResult
const lintNonControlRegex = "// deno-lint-ignore-file no-control-regex\n"
// const typesReference = '/// <reference types="./index.d.ts"/>\n'
Deno.writeTextFileSync("./index.js", lintNonControlRegex + code)
