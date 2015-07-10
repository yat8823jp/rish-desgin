// gulpプラグインの読みこみ
var gulp = require("gulp"),
    notify = require('gulp-notify'),
    imagemin = require("gulp-imagemin"),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade');

/*
* imagesフォルダー以下のファイルを監視し、
* 変更があり次第imagesフォルダー以下の画像の圧縮を実行するタスク
* */
gulp.task( 'imagemin', function(){
  var srcGlob = paths.srcDir + 'dev/images/**/*.+(jpg|jpeg|png|gif|svg)';
  var dstGlob = paths.dstDir;
  var imageminOptions = {
    optimizationLevel: 7
  };

  gulp.src( srcGlob )
    .pipe(imagemin( imageminOptions ))
    .pipe(gulp.dest( dstGlob ));
});

gulp.task('browser-sync', function() {
	gulp.src('./') //Webサーバーで表示するサイトのルートディレクトリを指定

	browserSync({
		watchTask: true,
		proxy: "localhost:8888",
		startPath: "/rish-design/"
    });
});

gulp.task('bsReload', function() {
	browserSync.reload();
});

/**
* Task
 */

gulp.task("default", ['browser-sync'], function() {
  gulp.watch("dev/images/**/*.+(jpg|jpeg|png|gif|svg)",["imagemin"]);
  gulp.watch("sass/**/*.scss",["sass"]);
  gulp.watch('./**/*.html',['bsReload']);
  gulp.watch('js/**/*.js',['bsReload']);
  gulp.watch('./**/*.css',['bsReload']);
  gulp.watch('./**/*.php',['bsReload']);
});
