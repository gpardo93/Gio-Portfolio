var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('serveprod', function() {
    connect.server({
      root: [your_project_path],
      port: process.env.PORT || 5000, // localhost:5000
      livereload: false
    });
  });
  
gulp.task('scripts', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['scripts', 'styles'], function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['styles']);
});
