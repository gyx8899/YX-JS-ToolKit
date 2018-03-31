# NPM and Plugin Guide

---

### IDEA auto babel setting in project
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