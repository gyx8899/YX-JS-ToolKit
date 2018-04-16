//Gulp-concat
// npm install --save-dev gulp-concat
let gulp = require('gulp'),
		concat = require('gulp-concat');

gulp.task('concat-js', function () {
	gulp.src('../samples/*.js')
			.pipe(concat('all.js'))//合并后的文件名
			.pipe(gulp.dest('../concat/js'));
});