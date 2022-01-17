const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));

gulp.task('minify', function () {
    gulp.src('projectsfiles/js/*.js')
        .pipe(uglify())
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build'));
})