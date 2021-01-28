import myExample from './src/04.rollup.plugin.example';

export default {
  input: './src/04.rollup.plugin.example.js',
  output: {
    file: './dist/04.bundle-esm.js',
    format: 'esm'
  },
  plugins: [myExample()]
}