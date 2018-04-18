'use strict';

//Gulp-autoprefixer
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function () {
	gulp.src('../autoprefixer/grid.css').pipe(autoprefixer({
		browsers: ['last 2 versions', 'Android >= 4.0'],
		cascade: true, //是否美化属性值 默认：true 像这样：
		//-webkit-transform: rotate(45deg);
		//        transform: rotate(45deg);
		remove: true //是否去掉不必要的前缀 默认：true
	})).pipe(gulp.dest('../autoprefixer/css'));
});

//# sourceMappingURL=9-gulp-autoprefixer.js.map