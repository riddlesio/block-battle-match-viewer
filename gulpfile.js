const
    gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    cssmin      = require('gulp-minify-css'),
    notify      = require('gulp-notify'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglifyjs'),
    prefix      = require('gulp-autoprefixer'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    // reactify    = require('reactify'),
    buffer      = require('vinyl-buffer'),
    sequence    = require('run-sequence'),
    source      = require('vinyl-source-stream'),
    srcDir      = './assets/src/';

var vendors = [
    'lodash',
    'omniscient',
    'react',
    ''
]

var handleError = function (error) {
    console.log(error);
};

gulp.task('deploy', function () {
    return gulp
        .src([
            './assets/dev/**/*',
            './assets/prod/**/*'
        ])
        .pipe(gulp.dest('./web/'))
        .pipe(notify({ message: 'CRM Deployed' }));
});

gulp.task('js:vendor', function () {

});

gulp.task('sass', function () {
    return gulp
        .src('./assets/src/scss/*.scss')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(compass({
            css: 'assets/dev/css',
            sass: 'assets/src/scss',
            sourcemap: true
        }))
        .pipe(prefix({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('./assets/dev/css'))
        .pipe(cssmin({ keepSpecialComments:0 }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/prod/css/'))
        .pipe(notify({ message: 'CRM Sass compiled' }));
});

gulp.task('img', function () {
    return gulp.src('./assets/src/img/*')
        .pipe(gulp.dest('./assets/dev/img/'))
        .pipe(notify({ message: 'Images copied' }));
});

gulp.task('js:minify', function () {
    return gulp.src('./assets/dev/js/*')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/prod/js/'))
        .pipe(notify({ message: 'Js Minified' }));
});

gulp.task('js:compile', function () {

    var bundler,
        stream;

    bundler = browserify([srcDir + 'js/bootstrap.js'], {
        debug:   true,
    });

    stream = bundler
        .transform(babelify)
        .bundle();

    return stream
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(source(srcDir + 'js/bootstrap.js'))
        .pipe(buffer())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./assets/dev/js'))
        .pipe(notify({ message: 'JS Compiled' }));
});

gulp.task('js', function () {
    sequence('js:compile', 'js:minify', 'img');
});

gulp.task('watch', function () {
    gulp.watch(['assets/src/js/**/*'], ['js']);
    gulp.watch(['assets/src/scss/**/*'], ['sass']);
    // checks on changes from the directory with compiled 'css' and 'js' on './assets/prod/**/*'
    gulp.watch(['./assets/prod/css/*', './assets/prod/js/*'], ['deploy']);
});