var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest("app/css/"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);