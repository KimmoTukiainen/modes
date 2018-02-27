// Rollup plugins.
import babel from "rollup-plugin-babel";
import cjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default {
  input: "lib/index.jsx",
  output: {
    file: "dist/index.js",
    format: "iife"
  },
  plugins: [
    postcss({ modules: true }),
    babel({
      babelrc: false,
      exclude: ["node_modules/**", "**/*.less"],
      presets: ["es2015-rollup", "stage-0", "react"]
    }),
    cjs({
      exclude: "node_modules/process-es6/**",
      include: [
        "node_modules/create-react-class/**",
        "node_modules/fbjs/**",
        "node_modules/object-assign/**",
        "node_modules/react/**",
        "node_modules/react-dom/**",
        "node_modules/prop-types/**"
      ]
    }),
    globals(),
    replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
    resolve({
      browser: true,
      main: true
    })
  ],
  sourcemap: true
};
