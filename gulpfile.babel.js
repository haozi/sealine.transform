'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const notify = require('gulp-notify');

gulp.task('babel', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      retainLines: true,
      plugins: ['transform-runtime'],
      presets: ['es2015', 'stage-3'],
    }))
    .on('error', notify.onError(error => error))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['babel'], function(a, b, c) {
    console.log(a, b, c)
  });
});

gulp.task('build', ['babel']);
