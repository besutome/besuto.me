var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
 
//CSSのタスク
gulp.task('css', function() {
  return gulp.src('public/css/*.css')
    .pipe(csso())
    .pipe(gulp.dest('common/css/'))
});
 
gulp.task("default", function() {
    gulp.watch("common/css/*.css",["css"]);
});

//Javascriptのタスク
gulp.task("js", function() {
  gulp.src(["common/js/*.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("common/js/min"))
    .pipe(browser.reload({stream:true}))
});
 
gulp.task("default", function() {
  gulp.watch(["common/js/*.js"],["js"]);
});

var paths = {
  commonDir : 'img/',
  miniDir : 'img_min/'
}
//画像最適化のタスク
gulp.task( 'imagemin', function(){
  var srcGlob = paths.commonDir + '/**/*.+(jpg|jpeg|png|gif|svg)';
  var dstGlob = paths.miniDir;
  var imageminOptions = {
    optimizationLevel: 7
  };
 
  gulp.src( srcGlob )
    .pipe(imagemin( imageminOptions ))
    .pipe(gulp.dest( dstGlob ));
});
