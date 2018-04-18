//Gulp rev-apppend
//基本使用（给页面引用url添加版本号，以清除页面缓存）
let gulp = require('gulp'),
		rev = require('gulp-rev-append');

gulp.task('default', function () {
	gulp.src('../revappend/index.html')
			.pipe(rev())
			.pipe(gulp.dest('../revappend/html'));
});
