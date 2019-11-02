/*eslint-env node */

let gulp 			= require('gulp');
let sass 			= require('gulp-sass'); 	// https://www.npmjs.com/package/gulp-sass
let autoprefixer 	= require('gulp-autoprefixer');
// let browserSync 	= require('browser-sync').create();

let sassFiles 		= 'sass/**/*.scss';
let cssDest 		= 'css/';

// CSS

gulp.task('default', ['styles'], function() {

	gulp.watch(sassFiles, ['styles']);
/*
	gulp.watch("*.html").on('change', browserSync.reload);

	browserSync.init({
		server: './'
	});
*/
});

gulp.task('sass', function () {
 return gulp.src(sassFiles)
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest(cssDest));
});


gulp.task('styles', function() {
	gulp.src(sassFiles)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(cssDest));
		//.pipe(browserSync.stream());
});
