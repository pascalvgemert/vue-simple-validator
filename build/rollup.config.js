import vue from "rollup-plugin-vue";
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify-es";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const config = {
  input: "src/index.js",
  output: {
    name: "VueSimpleValidator",
    exports: "named"
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    commonjs(),
    vue({
      css: false,
      compileTemplate: false,
      template: {
        isProduction: true
      }
    }),
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};

// Only minify browser (iife) version
if (argv.format === "iife") {
  config.plugins.push(uglify());
}

export default config;
