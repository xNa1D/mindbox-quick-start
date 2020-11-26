const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");

gulp.task("default", function () {});

gulp.task("css", function () {
  return gulp
    .src("./src/client/styles/**/*.css")
    .pipe(concat("style.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./src/client/styles"));
});

gulp.task("default", gulp.series("css"));
