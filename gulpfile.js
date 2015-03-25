/**
 * Created by SamWang on 24/3/2015.
 */
var gulp = require('gulp'),
    doxit = require('./index.js');

gulp.task('default', function() {
    return gulp.src('./example/**/*.js')
        .pipe(doxit())
        .pipe(gulp.dest('build/'));
});