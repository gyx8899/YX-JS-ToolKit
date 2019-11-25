'use strict';

//Gulp-concat
// npm install --save-dev gulp-concat
var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('concat-js', function () {
		gulp.src('../samples/*.js').pipe(concat('../concat/src/all.js')) //合并后的文件名
		.pipe(gulp.dest('../concat/dist'));
});

//# sourceMappingURL=4-gulp-concat.js.map