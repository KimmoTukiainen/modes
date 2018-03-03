// Rollup plugins.
import babel from "rollup-plugin-babel";
import cjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import json from "rollup-plugin-json";

export default {
  input: "lib/api/server.js",
  output: {
    file: "index.js",
    format: "cjs",
    sourcemap: false
  },
  external: ["express", "bodyParser", "mongodb", "path"],
  plugins: [
    builtins(),
    json(),
    resolve({
      browser: false,
      main: true,
      preferBuiltins: true,
      extensions: [".js"]
    }),
    cjs(),
    babel({
      babelrc: false,
      exclude: ["node_modules/**", "**/*.less"],
      presets: ["es2015-rollup", "stage-0", "react"]
    }),
    globals(),
    replace({ "process.env.NODE_ENV": JSON.stringify("development") })
  ]
};
