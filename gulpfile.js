// Gulpfile.js running on stratumui,
// a css framework available on npmjs.com
'use strict';

var gulp = require('gulp'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es'),
  rename = require('gulp-rename'),
  handlebars = require('gulp-handlebars'),
  declare = require('gulp-declare'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  precss = require('precss'),
  babel = require('gulp-babel'),
  resolveDependencies = require('gulp-resolve-dependencies'),
  livereload = require('gulp-livereload'),
  browserSync = require('browser-sync'),
  terser = require('gulp-terser');


var paths = {
  styles: {
    src: 'src/less/*.less',
    dest: 'assets/css'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'assets/js'
  },
  html: {
    src: 'views/*.hbs',
    dest: 'assets/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    //.pipe(sourcemaps.init())
    .pipe(less())
    //.pipe(sourcemaps.write('.', { sourceRoot: '/' }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(cleanCSS({
      debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(postcss([require('precss'), require('autoprefixer')]))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(livereload())
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(babel({
          presets: ['@babel/env'],
          //plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-dynamic-import']
    }))
    .on('error', console.error.bind(console))
    .pipe(resolveDependencies({
            pattern: /\* @requires [\s-]*(.*\.js)/g
        }))
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest));
}

function templates() {
  gulp.src('views/*.hbs')
    .pipe(handlebars())
    //.pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('assets/js/'));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.styles.src).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src).on('change', browserSync.reload);
}

var build = gulp.parallel(styles, scripts);

gulp.task(build);
gulp.task('default', build);
