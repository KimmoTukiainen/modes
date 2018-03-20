// Rollup plugins.
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
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
    format: "iife",
    sourcemap: true,
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    }
  },
  plugins: [
    resolve({
      browser: true,
      main: true
    }),
    babel({
      babelrc: true
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "./node_modules/react/react.js": [
          "cloneElement",
          "createElement",
          "PropTypes",
          "Children",
          "Component",
          "React"
        ]
      },
      extensions: [".js", ".jsx"]
    }),
    uglify(),
    copy({
      "lib/index.html": "dist/index.html",
      verbose: true
    }),
    postcss({ modules: true }),
    globals(),
    replace({ "process.env.NODE_ENV": JSON.stringify("development") })
  ]
};
