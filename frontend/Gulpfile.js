const gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            indentType: 'tab',
            indentWidth: 1
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', () => {
    gulp.watch(['./scss/*.scss'], ['sass']);
});