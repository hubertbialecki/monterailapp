var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')(),
    del = require('del'),
    sass = require('gulp-sass'); // load-plugins cannot load it with node-sass

var warn = function(err) { console.warn(err); };

var paths           = {
  public:  './public/',
  src: './source/'
}

gulp.task('default', [
  'clean', 'build', 'watch', 'server'
]);

gulp.task('build', [
  'sass', 'jade', 'javascript', 'vendor', 'json', 'images'
]);

gulp.task('watch', function(){
  return gulp.watch(paths.src + "**/*", ["build"]);
});

gulp.task('server', function(){
  plugin.connect.server({
    root: 'public',
    port: '8888'
  });
});

gulp.task('clean', function(){
  return del(paths.public).then(function(){
    console.log(paths.public + " has been erased.")
  });
});

// =============
// precompilers & file movers
// =============

gulp.task('jade', function() {
  return gulp.src(paths.src + '**/*.jade')
    .pipe(plugin.jade())
    .pipe(gulp.dest(paths.public))
});

gulp.task('sass', function(){
  return gulp.src(paths.src + 'stylesheets/style.{sass,scss}')
    .pipe(plugin.sass({
      includePaths: require('node-normalize-scss').includePaths
    }).on('error', sass.logError))
    .pipe(plugin.autoprefixer())
    .pipe(gulp.dest(paths.public + '/'))
});

gulp.task('javascript', function(){
  return gulp.src(paths.src + 'js/**/*.js')
    .pipe(gulp.dest(paths.public + 'js/'))
});

gulp.task('json', function(){
  return gulp.src(paths.src + 'data/**/*.json')
    .pipe(gulp.dest(paths.public + 'data/'))
});

gulp.task('vendor', function(){
  return gulp.src(paths.src + 'vendor/**/*.*')
    .pipe(gulp.dest(paths.public + 'vendor/'))
});

gulp.task('images', function(){
  return gulp.src(paths.src + 'assets/images/**/*.{png,jpg,jpeg}')
    .pipe(gulp.dest(paths.public + 'assets/images/'))
});
