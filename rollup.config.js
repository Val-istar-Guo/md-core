import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';


const plugins = [
  resolve(),
  babel({
    babelrc: false,
    presets: [
      ["env", {
        modules: false
      }],
    ],
    plugins: ["transform-object-rest-spread", "external-helpers"],
    // runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
]

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins,
}, {
  input: 'src/tools/index.js',
  output: {
    file: 'utils.js',
    format: 'cjs',
  },
  plugins,
}];
