/*eslint-env node */

// npm i gulp gulp-sass gulp-autoprefixer && npm audit fix

let gulp 			= require('gulp'); 				// https://www.npmjs.com/package/gulp
let sass 			= require('gulp-sass'); 		// https://www.npmjs.com/package/gulp-sass
let autoprefixer 	= require('gulp-autoprefixer'); // https://www.npmjs.com/package/gulp-autoprefixer

let sassFiles 		= 'sass/**/*.scss';
let cssDest 		= 'src/';

// CSS / Autoprefixer

gulp.task('default', ['styles'], function() {
	gulp.watch(sassFiles, ['styles']);
});

gulp.task('styles', function() {
	gulp.src(sassFiles)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(cssDest));
});

// Compressed

gulp.task('sass', function () {
 return gulp.src(sassFiles)
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest(cssDest));
});
