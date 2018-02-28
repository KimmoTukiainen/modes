// Rollup plugins.
import babel from "rollup-plugin-babel";
import cjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import uglify from "rollup-plugin-uglify";

export default {
  input: "lib/index.jsx",
  output: {
    file: "dist/index.js",
    format: "iife"
  },
  plugins: [
    resolve({
      browser: true,
      main: true
    }),
    cjs(),
    babel({
      babelrc: false,
      exclude: ["node_modules/**", "**/*.less"],
      presets: ["es2015-rollup", "stage-0", "react"]
    }),
    uglify(),
    copy({
      "lib/index.html": "dist/index.html",
      verbose: true
    }),
    postcss({ modules: true }),
    globals(),
    replace({ "process.env.NODE_ENV": JSON.stringify("development") })
  ],
  sourcemap: true
};
