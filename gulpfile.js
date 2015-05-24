var gulp = require('gulp'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	shell = require('shelljs');


gulp.task('compress', function () {

	gulp.src('src/resources.js')
		.pipe( watch('src/resources.js') )
		.pipe( uglify() )
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe( gulp.dest('dist') );

})

gulp.task('develop', ['compress']);

gulp.task('default', ['develop']);