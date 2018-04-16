//Gulp-uglify
var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		gulputil= require('gulp-util');

gulp.task('minijs', function () {
	gulp.src(['../minify/*.js', '!../minify/ignore/{script-hello}.js'])
			.pipe(uglify({
				// mangle: true,
				// Not support except
				mangle: {},
				compress: true
				// Not support preserveComments
			}))
			.on('error', function (err) {
				gulputil.log(gulputil.log(gulputil.colors.red('[Error]'), err.toString()))
			})
			.pipe(gulp.dest('../minify/min'));
});