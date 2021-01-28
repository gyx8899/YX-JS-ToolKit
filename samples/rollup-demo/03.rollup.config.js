import json from '@rollup/plugin-json';

export default {
  input: './src/03.main.js',
  output: {
    file: './dist/03.bundle-cjs.js',
    format: 'cjs'
  },
  plugins: [
      json()
  ]
}