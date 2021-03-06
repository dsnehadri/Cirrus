// Automate my builds

var gulp = require('gulp');
var prop = require('./package.json');
var minify = require('gulp-clean-css');
var $ = require('gulp-load-plugins')();
var head = '\/*\r\n* Cirrus ' + prop.version + `\r\n* Stanley Lim, Copyright ${(new Date()).getFullYear()}\r\n* https://spiderpig86.github.io/Cirrus\r\n*/\r\n`;

gulp.task('compile', function() {
    return gulp.src('./src/**/*.css')
        .pipe($.concat('cirrus.css'))
        .pipe($.header(head))
        .pipe($.size())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['compile'], function() {
    return gulp.src(['./dist/cirrus.css'])
        .pipe(minify({
            level: {
                1: {
                    all: true,
                    normalizeUrls: false
                  },
                2: {
                    restructureRules: true,
                    removeDuplicateRules: true
                }
              }
        }, function(details) {
            console.log('FULL');
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
          }))
        .pipe($.header(head))
        .pipe($.size())
        .pipe($.concat('cirrus.min.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('core', function() {
    return gulp.src('./src/core/*.css')
        .pipe($.concat('cirrus-core.css'))
        .pipe($.header(head))
        .pipe($.size())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-core', ['core'], function() {
    return gulp.src(['./dist/cirrus-core.css'])
        .pipe(minify({
            level: {
                1: {
                    all: true,
                    normalizeUrls: false
                  },
                2: {
                    restructureRules: true,
                    removeDuplicateRules: true
                }
              }
        }, function(details) {
            console.log('CORE');
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
          }))
        .pipe($.header(head))
        .pipe($.size())
        .pipe($.concat('cirrus-core.min.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/*.css', ['minify', 'minify-core']);
});

gulp.task('default', ['minify', 'minify-core']);