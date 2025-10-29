import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

export default [
  // ESM
  {
    input: "source/index.js", // ajustado para la estructura del repo
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
      resolve({ extensions: [".js", ".ts", ".tsx"] }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
    output: {
      file: "dist/esm/index.js",
      format: "esm",
      sourcemap: true,
    },
  },
  // CJS
  {
    input: "source/index.js",
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
      resolve({ extensions: [".js", ".ts", ".tsx"] }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      terser(),
    ],
    output: {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
  },
];
