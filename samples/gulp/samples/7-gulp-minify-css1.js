'use strict';

//Gulp-minify-css
var gulp = require('gulp'),
    cssmin = require('gulp-minify-css');

gulp.task('simpleCSSmin', function () {
	gulp.src('../cssmin/*.css').pipe(cssmin()).pipe(gulp.dest('../cssmin/simple'));
});

//gulp-minify-css 最终是调用clean-css
// let gulp = require('gulp'),
// 		cssmin = require('gulp-minify-css');

gulp.task('optionCSSmin', function () {
	gulp.src('../cssmin/*.css').pipe(cssmin({
		advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
		compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
		keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
		keepSpecialComments: '*'
		//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
	})).pipe(gulp.dest('../cssmin/option'));
});

//给css文件里引用url加版本号（根据引用文件的md5生产版本号）
//
// let gulp = require('gulp'),
// 		cssmin = require('gulp-minify-css');
//确保已本地安装gulp-make-css-url-version [cnpm install gulp-make-css-url-version --save-dev]
var cssver = require('gulp-make-css-url-version');

gulp.task('cssMinVer', function () {
	gulp.src('../cssmin/*.css').pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
	.pipe(cssmin()).pipe(gulp.dest('../cssmin/minver'));
});

gulp.task('default', ['cssMinVer', 'optionCSSmin', 'simpleCSSmin']);

//# sourceMappingURL=7-gulp-minify-css1.js.map