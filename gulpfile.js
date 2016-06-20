var gulp          = require('gulp');
var clean         = require('gulp-clean');
var jade          = require('gulp-jade');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync').create();
var autoprefixer  = require('gulp-autoprefixer');
var exec          = require('child_process').exec;

var root = '../ttstatic.github.io/';
var dir = 'themepalette';

// - ###########################################################################
// - Runs the 'clean' task first before it run all other tasks.
// - ###########################################################################
gulp.task('default', ['clean'], function(cb) {
    exec('gulp main', function(err,stdout,stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
gulp.task('main', ['jade', 'sass', 'copy', 'bower']);

// - ###########################################################################
// - Compile JADE files to HTML
// - ###########################################################################
gulp.task('jade', function() {
    /*
     * Compile all Jade files except files with
     * file names that starts with an underscore('_').
     */
     return gulp.src(['./*.jade', '!**[^_]/*.jade'])
       .pipe(jade({
           doctype: 'html',
           pretty: true
       }))
       .pipe(gulp.dest(root + dir))
       .pipe(browserSync.stream());
});

// - ###########################################################################
// - Compile SASS files to CSS
// - ###########################################################################
gulp.task('sass', function() {
    return gulp.src('assets/css/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(root + dir + '/assets/css'))
      .pipe(browserSync.stream());
});

// - ###########################################################################
// - Copy assets (css, images, scripts, etc...)
// - ###########################################################################
var assetsBaseDir = "./assets";
var assets = [
    assetsBaseDir + '/css/**/*.css',
    assetsBaseDir + '/images/**/*.*',
    assetsBaseDir + '/scripts/**/*.*',
    assetsBaseDir + '/vendor/bootstrap/dist/**/*.*',
    assetsBaseDir + '/fonts/**/*.*',
    "!" + assetsBaseDir + '/css/*.scss',
    'components/**/*.*',
];
gulp.task('copy', function() {
    gulp.src(assets, { base: './'})
        .pipe(gulp.dest(root + dir));
});

// - ###########################################################################
// - Copy plugins from bower
// - ###########################################################################
var bowerBaseDir = "./bower_components";
var bower = [
    bowerBaseDir + '/jquery/dist/**/*.*',
    bowerBaseDir + '/jquery.cookie/**/*.*',
    '!' + bowerBaseDir + '/jquery.cookie/*.json', // Exclude '.json' files
    bowerBaseDir + '/font-awesome/**/*.*',
    '!' + bowerBaseDir + '/font-awesome/scss/**', // Exclude 'scss' folder
    '!' + bowerBaseDir + '/font-awesome/less/**', // Exclude 'less' folder
    '!' + bowerBaseDir + '/font-awesome/*.json', // Exclude '.json' files
    '!' + bowerBaseDir + '/font-awesome/*.txt', // Exclude '.txt' files
    bowerBaseDir + '/Chart.js/**/*.*',
    bowerBaseDir + '/webcomponentsjs/**/*.*',
];
gulp.task('bower', function() {
    gulp.src(bower, { base: './'})
        .pipe(gulp.dest(root + dir));
});

// - ###########################################################################
// - Clean task (deletes the public folder)
// - ###########################################################################
gulp.task('clean', function() {
    return gulp.src(root + dir, { read: false })
        .pipe(clean({force: true}));
});

// - ###########################################################################
// - Serve app and watch
// - ###########################################################################
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: root + dir
    }
  });
  gulp.watch('assets/css/**/*.scss', ['sass']);
  gulp.watch('./**/*.jade',['jade']);
});
