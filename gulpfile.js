var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
  gulp.src('src/spiiin.js')
    .pipe(uglify())
    .pipe(rename('spiiin.min.js'))
    .pipe(gulp.dest('dist/'))
});
