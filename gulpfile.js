const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
// const babel = require('gulp-babel');
const rename = require('gulp-rename');
const inject = require('gulp-inject-string');

const sync = require('browser-sync').create();
const fs = require('fs');

gulp.task('watch', () => {
  sync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch('src/*.js', gulp.series('script'));
  gulp.watch('public/*.html', gulp.series('html'));
  gulp.watch('public/*.html').on('change', sync.reload);
});

// Using uglify-es can minify javascript with es6 syntax without babel.
gulp.task('script', () => {
  return gulp.src('src/*.js')
    .pipe(rename({ suffix: '.min' }))
    // .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
});

gulp.task('html', () => {
  const targetFiles = fs.readdirSync('dist/js', 'utf-8');
  let stream = gulp.src('public/index.html');
  targetFiles.forEach((fileName) => {
    stream = stream.pipe(inject.before('</body>', `<script src="/js/${fileName}"></script>\n`));
  })

  return stream.pipe(gulp.dest('dist'));
});

exports.dev = gulp.series('script', 'html', 'watch');
exports.build = gulp.series('script', 'html');