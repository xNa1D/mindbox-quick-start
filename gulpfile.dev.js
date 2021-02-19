const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const clean = require("gulp-clean");

const path = {
  input: "./src/client",
  output: "./src/client",
};

gulp.task("default", function () {});

gulp.task("clean", function () {
  return gulp
    .src(`${path.input}/styles/style.css`)
    .pipe(clean({ read: false }));
});

gulp.task("css", function () {
  return gulp
    .src(`${path.input}/styles/**/*.css`)
    .pipe(concat("style.css"))
    .pipe(
      cleanCSS({
        compatibility: "ie8",
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(gulp.dest(`${path.input}/styles`));
});

gulp.task("default", gulp.series("clean", "css"));

// watch("./src/client/**/*", gulp.task("default", gulp.series("css", "html")));
