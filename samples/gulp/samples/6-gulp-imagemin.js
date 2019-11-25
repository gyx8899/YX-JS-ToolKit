'use strict';

//Gulp-imagemin
// npm install --sav-dev gulp-imagemin
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('imagemin', function () {
	gulp.src('../imagemin/src/*.{png,jpg,gif,ico}').pipe(imagemin({
		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
		progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
		interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
		multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	})).pipe(gulp.dest('../imagemin/dist/normal'));
});

// npm install --save-dev imagemin-pngquant
//深度压缩图片
// let gulp = require('gulp'),
// 		imagemin = require('gulp-imagemin');
//确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
var pngquant = require('imagemin-pngquant');

gulp.task('imagemindeep', function () {
	gulp.src('../imagemin/src/*.{png,jpg,gif,ico}').pipe(imagemin({
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
		use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
	})).pipe(gulp.dest('../imagemin/dist/deep'));
});

//只压缩修改的图片
// let gulp = require('gulp'),
// 		imagemin = require('gulp-imagemin'),
// 		pngquant = require('imagemin-pngquant');
// npm install gulp-cache --save-dev
var cache = require('gulp-cache');

gulp.task('imageminmodify', function () {
	gulp.src('../imagemin/src/*.{png,jpg,gif,ico}').pipe(cache(imagemin({
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngquant()]
	}))).pipe(gulp.dest('../imagemin/dist/modified'));
});

gulp.task('default', ['imagemin', 'imagemindeep', 'imageminmodify']);

//# sourceMappingURL=6-gulp-imagemin.js.map