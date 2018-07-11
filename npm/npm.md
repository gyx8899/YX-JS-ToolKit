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

### Gulp using
```cmd
dir
cls
npm list
npm install -g gulp

npm install --save-dev gulp
----------------------------
npm install --save-dev gulp-less

npm install -g gulp-if

```
[Gulp guide in detail](http://www.ydcss.com/archives/18)

### Service worker: sw-precache
```cmd
npm install --save-dev sw-precache
npm install -g gulp
```
```javascript

gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache');
  var rootDir = 'app';
 
  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: rootDir
  }, callback);
});
```

### Lavas
```cmd
// Init lavas global
npm install -g lavas

// Init temp lavas project
lavas init
...

//
cd [projectName]
npm install
lavas dev

```

### Webpack
--------
```cmd
npm ERR! Unexpected end of JSON input while parsing near '....0.0","inherits":"^2.'
> npm clean cache --force

```