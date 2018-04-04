# NPM and Plugin Guide

---

### IDEA auto babel setting ES6 to ES5 in project
* Add package.json file;
```json
{
  "name": "YX-JS-ToolKit",
  "version": "0.0.1",
  "dependencies": {}
}
```

* Add .babelrc file;
```json
{
  "presets": [
    "es2015"
  ]
}
```

* NPM Install
```cmd

npm install --save-dev babel-cli

npm install --save-dev babel-preset-es2015
//deprecated babel-preset-es2015, use babel-preset-env

npm install --save-dev babel-preset-env

File --> Setting --> Tools --> File Watcher --> + babel
File Type: ES6


Field argument: default
$FilePathRelativeToProjectRoot$ --out-dir dist --source-maps --presets env

Field argument: custom
--source-maps --out-file $FileDir$\$FileNameWithoutExtension$.js --presets env $FilePath$

Out path: default
dist\$FileDirRelativeToProjectRoot$\$FileNameWithoutExtension$.js:dist\$FileDirRelativeToProjectRoot$\$FileNameWithoutExtension$.js.map

Out path: Custom
$FileNameWithoutExtension$.js:$FileNameWithoutExtension$.js.map

```

### IDEA auto setting uglify js
```cmd
npm install -g uglify-js

npm install --save-dev uglify-js

// Program path
C:\Users\Steper\AppData\Roaming\npm\uglifyjs.cmd
```

### Node JS deep iterator files
```cmd
npm install --save-dev rd
```