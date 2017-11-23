var gulp = require('gulp');

var less = require('gulp-less');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('hello', function() {
	console.log('hello world');
})

//convart less to css
gulp.task('less', function() {
	return gulp.src('dist/style/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/style/css'))
});

//check the js
gulp.task('jshint', function() {
	gulp.src('dist/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

gulp.task('scripts', function() {
	gulp.src('dist/js/*.js')
		.pipe(concat('global-plugin.js'))
		.pipe(gulp.dest('dist/concat'))
		.pipe(rename('global-plugin.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/concat'));
});

//the default task
gulp.task('default', function() {
	gulp.run('jshint', 'less', 'scripts')
	
	gulp.watch('dist/style/global.less', function() {
		gulp.run('less')
	})
	gulp.watch('dist/js/*.js', function() {
		gulp.run('jshint', 'scripts')
	})

});

//this is a watch event , if you start , you will not be able to stop it
gulp.task('watch', function() {
	gulp.run('less')
});
		