// rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块
import resolve from '@rollup/plugin-node-resolve';
// rollup-plugin-commonjs 插件就是用来将 CommonJS 转换成 ES2015 模块的。
import commonjs from '@rollup/plugin-commonjs';
// 使用未被浏览器和 Node.js 支持的将来版本的 JavaScript 特性
import babel from '@rollup/plugin-babel';

export default {
  input: './src/05.main.js',
  output: {
    file: './dist/05.bundle-cjs.js',
    format: 'cjs'
  },
  plugins: [
      resolve({
        // 将自定义选项传递给解析插件
        moduleDirectories: ['node_modules']
      }),
      // 将 .babelrc 文件放在 src 中，而不是根目录下。 这允许我们对于不同的任务有不同的 .babelrc 配置，比如像测试，如果我们以后需要的话 - 通常为单独的任务单独配置会更好。
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
    commonjs()
  ],
  // 指出应将哪些模块视为外部模块
  //  external: id => /lodash/.test(id)
  external: ['lodash']
}