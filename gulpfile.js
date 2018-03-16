const gulp        = require('gulp');
const sass        = require('gulp-sass');
const nodemon     = require('gulp-nodemon');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const ngrok = require('ngrok')

var started = false;
gulp.task('nodemon', function (cb) {
    return nodemon({
        script : 'app.js',
        ext: 'js njk'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', () => {reload()});
});

gulp.task('browser-sync', ['nodemon'], function() {
    const port = 7000;
    browserSync.init(null, {
        proxy : 'http://localhost:5000',
        browser : 'google chrome',
        port : port
    }, function (err, bs) {
        ngrok.connect(bs.options.get('port'), function (err, url) {
            if (err) {
                console.log(`err: ${err}`);
            }
            console.log(`NGROK URL: ${url}`);
        });
    });
});

gulp.task('sass', function () {
    return gulp.src('stylesheets/**/*.scss')
        .pipe(sass({
            errLogToConsole : true,
            sourceComments : true,
        }).on('error', sass.logError))
        // Will Pipe Browser Prefixes when production ready.
        // .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({ stream : true }));
});

gulp.task('watch', function () {
    gulp.watch('stylesheets/**/*.scss', ['sass']);
    gulp.watch('public/css/**/*.css').on('change', reload);
    gulp.watch('templates/**/*.njk').on('change', reload);
    gulp.watch('public/js/**/*.js').on('change', reload);
});

gulp.task('default', ['watch', 'sass', 'browser-sync']);

gulp.task('build', ['sass'])
