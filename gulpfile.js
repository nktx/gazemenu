'use strict';

// Plugins
var gulp = require('gulp'),
		del = require('del'),
		watch = require('gulp-watch');

var rename = require('gulp-rename');
var sass = require('gulp-sass');

// Styles
gulp.task('styles', function() {
	return gulp.src(['app/styles/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/css/'));
}); 

// Clean task
gulp.task('clean', function() {
	return del(['public/css']);
});

// Default task
gulp.task('default', ['clean'], function() {  
	gulp.start('styles');
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('app/styles/**/*.scss', ['styles']);
});