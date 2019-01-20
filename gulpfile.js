// Gulpfile.js running on stratumui,
// a css framework available on npmjs.com
'use strict';

var gulp = require('gulp'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es'),
  rename = require('gulp-rename'),
  declare = require('gulp-declare'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  postcss = require('gulp-postcss'),
  cssDeclarationSorter = require('css-declaration-sorter'),
  precss = require('precss'),
  babel = require('gulp-babel'),
  resolveDependencies = require('gulp-resolve-dependencies'),
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
  },
  images: {
    src: '/var/www/hackers/content/images/2018/',
    dest: '/var/www/hackers/content/images/2018/'
  }
};


function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(rename({ basename: 'main', suffix: '.min' }))
    .pipe(cleanCSS({ debug: true }))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(postcss([require('precss'), require('autoprefixer'), cssDeclarationSorter({ order: 'smacss'})]))
    .pipe(concat('main.min.css'))
    .pipe(cleanCSS({debug: true}))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src).pipe(babel({
    presets: ['@babel/env'],
    //plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-dynamic-import']
  })).on('error', console.error.bind(console))
  .pipe(resolveDependencies({pattern: /\* @requires [\s-]*(.*\.js)/g}))
  .pipe(concat('main.min.js'))
  .pipe(terser())
  .pipe(gulp.dest(paths.scripts.dest));
}
/*
function responsive() {
  return gulp.src(paths.images.src + '/2018/*.jpg')
  .pipe(imagemin(
    [imageminJpegtran({progressive: true})],
    {verbose: true}
  ))
  .pipe(responsive({
      '*.png': [{
        width: 300,
        rename: {
          suffix: '-300px',
          extname: '.jpg',
        },
        format: 'jpeg',
      }, {
        width: 600,
        rename: {
          suffix: '-600px',
          extname: '.jpg',
        },
        // format option can be omitted because
        // format of output image is detected from new filename
        // format: 'jpeg'
      }, {
        width: 1000,
        rename: {
          suffix: '-1000px',
          extname: '.jpg',
        },
        // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }, {
        // Convert images to the webp format
        width: 630,
        rename: {
          suffix: '-630px',
          extname: '.webp',
        },
      }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Do not emit the error when image is enlarged.
      errorOnEnlargement: false,
    }))
  .pipe(gulp.dest(paths.images.dest));
}

function image_loop() {
  fs.readdir(paths.images.src, function(err, folders) {
    for(var i =0; i < folders.length; i++){
      var folder_path = path.join(paths.images.src, folders[i]);
      images(folders[i]);
    }
  });
}*/

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.parallel(styles, scripts, watch); // , image_loop

//gulp.task(build);
gulp.task('default', build);
