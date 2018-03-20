// Rollup plugins.
import babel from "rollup-plugin-babel";
import cjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";

export default {
  input: "lib/api/server.js",
  output: {
    file: "dist_server/index.js",
    format: "cjs",
    sourcemap: false,
    intro: "var regeneratorRuntime = require('regenerator-runtime');\n"
  },
  external: ["express", "body-parser", "mongodb", "path", "jsonwebtoken", "dotenv", "fs"],
  plugins: [
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
    })
  ]
};
