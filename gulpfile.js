const gulp = require("gulp");
const webserver = require("gulp-webserver");
const scss = require("gulp-sass");
const cssmin = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
gulp.task("devSass", () => {
    return gulp.src("./src/scss/*.scss")
        .pipe(scss())
        .pipe(cssmin())
        .pipe(gulp.dest("./src/css"))
})

gulp.task("jsmin", () => {
    return gulp.src("./src/js/page/index.js")
        .pipe(uglify())
        .pipe(gulp.dest("./src/js"))
})
gulp.task("htmlmin", () => {
    return gulp.src("./src/index.html")
        .pipe(htmlmin())
        .pipe(gulp.dest("./src/"))
})
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 8888,
            open: true,
            livereload: true,
            proxies: [
                { source: "/getData", target: "http://localhost:3000/getData" },
                { source: "/addData", target: "http://localhost:3000/addData" },
                { source: "/removeData", target: "http://localhost:3000/removeData" }
            ]
        }))

})
gulp.task("watching", () => {
    return gulp.watch("./src/scss/**/*.scss", gulp.series("devSass"))

})
gulp.task("default", gulp.series("devSass", "server", "watching"))