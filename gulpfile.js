// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');
// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var handlebars = require('gulp-handlebars');
var sourcemaps = require('gulp-sourcemaps');
var bs = require("browser-sync").create();
var reload      = bs.reload;

bs.init({
    proxy: 'http://127.0.0.1:3001'
});

livereload({ start: true })

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});



gulp.task('styles', function() {
    return gulp.src('assets/css/*.less')
        .pipe(less({outputStyle: 'expanded', unix_newlines: true, linefeed: "lf"}))
        .pipe(autoprefixer())
        .pipe(minifyCss({
            keepSpecialComments: 1
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload())
        pipe(bs.reload({
          stream: true
        }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(sourcemaps.init())
          .pipe(concat('all.js'))
          .pipe(gulp.dest('dist'))
          .pipe(rename('all.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist/js'))
        .pipe(sourcemaps.init())
        .pipe(livereload())
        .pipe(bs.reload({
          stream: true
        }));
});

/*
gulp.task('templates', function(){
  gulp.src('views/*.hbs')
    .pipe(handlebars())
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/'));
});
*/

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/less/*.less', ['styles']);
});

// Default Task
gulp.task('default', ['lint', 'styles', 'scripts', 'watch']);
