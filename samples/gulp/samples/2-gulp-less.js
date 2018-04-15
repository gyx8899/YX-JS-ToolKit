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