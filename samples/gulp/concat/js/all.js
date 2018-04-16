'use strict';

var gulp = require('gulp');

// Hello world
gulp.task('default', function () {
	console.log("Gulp: hello world!");
});

//# sourceMappingURL=1-hello-gulp.js.map
"use strict";var gulp=require("gulp");gulp.task("default",function(){console.log("Gulp: hello world!")});
'use strict';

var gulp = require('gulp');

var less = require('gulp-less');
gulp.task('testLess1', function () {
		// gulp.src('src/less/index.less')
		gulp.src('../less/*.less')
		// gulp.src(['less/*.less', '!less/{extend,page}/*.less'])
		.pipe(less())
		// .pipe(gulp.dest('src/css'));
		.pipe(gulp.dest('../less/css1'));
});

//Gulp-less
// let gulp = require('gulp'),
// 		less = require('gulp-less');
var notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('testLess2', function () {
		gulp.src('../less/*.less').pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })).pipe(less()).pipe(gulp.dest('../less/css2'));
});

gulp.task('watchLessTask', function () {
		gulp.watch('../less/*.less', ['testLess2']);
});

// gulp.task('default',['testLess1', 'testLess2', 'watchLessTask']);

//# sourceMappingURL=2-gulp-less.js.map
"use strict";var gulp=require("gulp");var less=require("gulp-less");gulp.task("testLess1",function(){gulp.src("../less/*.less").pipe(less()).pipe(gulp.dest("../less/css1"))});var notify=require("gulp-notify"),plumber=require("gulp-plumber");gulp.task("testLess2",function(){gulp.src("../less/*.less").pipe(plumber({errorHandler:notify.onError("Error: <%= error.message %>")})).pipe(less()).pipe(gulp.dest("../less/css2"))});gulp.task("watchLessTask",function(){gulp.watch("../less/*.less",["testLess2"])});
'use strict';

//Gulp-uglify
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gulputil = require('gulp-util');

gulp.task('minijs', function () {
	gulp.src(['../minify/*.js', '!../minify/ignore/{script-hello}.js']).pipe(uglify({
		// mangle: true,
		// Not support except
		mangle: {},
		compress: true
		// Not support preserveComments
	})).on('error', function (err) {
		gulputil.log(gulputil.log(gulputil.colors.red('[Error]'), err.toString()));
	}).pipe(gulp.dest('../minify/min'));
});

//# sourceMappingURL=3-gulp-uglify.js.map
"use strict";var gulp=require("gulp"),uglify=require("gulp-uglify"),gulputil=require("gulp-util");gulp.task("minijs",function(){gulp.src(["../minify/*.js","!../minify/ignore/{script-hello}.js"]).pipe(uglify({mangle:{},compress:true})).on("error",function(err){gulputil.log(gulputil.log(gulputil.colors.red("[Error]"),err.toString()))}).pipe(gulp.dest("../minify/min"))});
'use strict';

//Gulp-concat
// npm install --save-dev gulp-concat
var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('concat-js', function () {
		gulp.src('../samples/*.js').pipe(concat('all.js')) //合并后的文件名
		.pipe(gulp.dest('../concat/js'));
});

//# sourceMappingURL=4-gulp-concat.js.map
"use strict";var gulp=require("gulp"),concat=require("gulp-concat");gulp.task("concat-js",function(){gulp.src("../samples/*.js").pipe(concat("all.js")).pipe(gulp.dest("../concat/js"))});