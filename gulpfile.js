var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['js']);
});
