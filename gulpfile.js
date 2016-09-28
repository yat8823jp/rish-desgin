// gulpプラグインの読みこみ
<<<<<<< HEAD
var gulp = require('gulp'),
		scss = require( 'gulp-sass' ),
		imagemin = require( 'gulp-imagemin' ),//画像圧縮
		imageminPngquant = require( 'imagemin-pngquant' ),//png画像の圧縮
		plumber = require( 'gulp-plumber' ),//エラー通知
		notify = require( 'gulp-notify' ),//エラー通知
		pleeease = require( 'gulp-pleeease' ),//ベンダープレフィックス
		browserSync = require('browser-sync'),
		sourcemaps = require( 'gulp-sourcemaps' ),
		paths = {
			rootDir : '',
			dstrootDir : '',
			srcDir : 'images_org',
			dstDir : 'img'
		}

/*
 * Sass
 */
gulp.task( 'scss', function() {
	gulp.src( paths.rootDir + '/scss/**/*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}) )
		.pipe( scss() )
		.pipe( pleeease() )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( paths.rootDir + '/css' ) );
=======
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
>>>>>>> 8d970645d91408e1054e0093f8f57a0e5e6fbc18
});

/*
 * Imagemin
 */
gulp.task( 'imagemin', function(){
	var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg)';
	var dstGlob = paths.dstDir;
	var imageminOptions = {
		optimizationLevel: 7,
		use: imageminPngquant( {quality: '65-80', speed: 1 } )
	};

	gulp.src( srcGlob )
		.pipe( plumber ( {
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		} ) )
		.pipe( imagemin( imageminOptions ) )
		.pipe( gulp.dest( paths.dstDir ) );
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

<<<<<<< HEAD

/**
* Command
 */
gulp.task('default', ['browser-sync'],function(){
	gulp.watch( paths.rootDir + '/scss/**/*.scss', ['scss'] );
	gulp.watch('./**/*.php',['PHP:reload']);

	// **
	// HTMLやJSなどがあれば、下記を有効にする
	// *
	// gulp.watch('./**/*.html',['HTML:reload']);
	// gulp.watch('./**/*.js',['JS:reload']);
=======
gulp.task("default", ['browser-sync'], function() {
  gulp.watch("dev/images/**/*.+(jpg|jpeg|png|gif|svg)",["imagemin"]);
  gulp.watch("sass/**/*.scss",["sass"]);
  gulp.watch('./**/*.html',['bsReload']);
  gulp.watch('js/**/*.js',['bsReload']);
  gulp.watch('./**/*.css',['bsReload']);
  gulp.watch('./**/*.php',['bsReload']);
>>>>>>> 8d970645d91408e1054e0093f8f57a0e5e6fbc18
});
