const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const image = require("gulp-image");
const clean = require("gulp-clean");

gulp.task("default", function () {});

// gulp.task("clean", function () {
//   return gulp
//     .src(`${path.input}/styles/style.css`)
//     .pipe(clean({ read: false, allowEmpty: true }));
// });

gulp.task("html", function (done) {
  gulp.src("./src/client/*.html").pipe(gulp.dest("./build/client/"));
  done();
});

gulp.task("image", function (done) {
  gulp
    .src("./src/client/images/*")
    .pipe(image())
    .pipe(gulp.dest("./build/client/images"));
  done();
});

gulp.task("fonts", function (done) {
  gulp
    .src("./src/client/styles/themes/default/assets/fonts/*")
    .pipe(gulp.dest("./build/client/styles/themes/default/assets/fonts"));
  done();
});

gulp.task("css", function () {
  return gulp
    .src("./src/client/styles/**/*.css")
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
    .pipe(gulp.dest("./build/client/styles"));
});

gulp.task("default", gulp.series("css", "html", "image", "fonts"));

// watch("./src/client/**/*", gulp.task("default", gulp.series("css", "html")));
