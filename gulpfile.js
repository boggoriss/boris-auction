import gulp from "gulp";
import less from "gulp-less";
import babel from "gulp-babel";
import del from 'del';

gulp.task('delete', () => {
    return del('./public/stylesheets/css/*.css');
});

gulp.task('css', () => {
    return gulp.src('./public/stylesheets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/stylesheets/css'))
});

gulp.task('deleteBabel', () => {
    return del('./public/js/babel/*.js')
});

gulp.task('babel', () => {
    return gulp.src('./public/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./public/js/babel/'))
});


gulp.task("default", gulp.parallel(gulp.series('delete', 'css'), gulp.series('deleteBabel', 'babel')));