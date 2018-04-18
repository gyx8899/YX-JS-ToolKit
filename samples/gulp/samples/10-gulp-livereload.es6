//Gulp-livereload
//基本使用(当less发生变化的时候，自动更新页面)
let gulp = require('gulp'),
		less = require('gulp-less'),
		livereload = require('gulp-livereload');

gulp.task('default', function () {
	gulp.src('../livereload/*.less')
			.pipe(less())
			.pipe(gulp.dest('../livereload/css'))
			.pipe(livereload());
});

//特别注意：若编译less的时候，同时执行其他操作，有可能引起页面刷新，而不是将样式植入页面
//例如下面任务同时生成sourcemap：
//let sourcemaps = require('gulp-sourcemaps');
//gulp.task('less', function () {
//    gulp.src(['src/less/*.less'])
//        .pipe(sourcemaps.init())
//        .pipe(less())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('src/css'))
//        .pipe(livereload());
//});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('src/less/**/*.less', ['less']);
});