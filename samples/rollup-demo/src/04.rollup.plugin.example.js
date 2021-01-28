export default function () {
  return {
    name: 'my-example',
    resolveId(source) {
      if (source === 'virtual-module') {
        return source;
      } else {
        return null;
      }
    },
    load(id) {
      if (id === 'virtual-module') {
        return 'This is virtual module';
      } else {
        return null;
      }
    }
  };
}
// npm uninstall --save-dev rollup-plugin-node-resolve
// npm i --save-dev @rollup/plugin-node-resolve