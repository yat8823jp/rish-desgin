// gulpプラグインの読みこみ
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

gulp.task("default", ['browser-sync'], function() {
  gulp.watch("dev/images/**/*.+(jpg|jpeg|png|gif|svg)",["imagemin"]);
  gulp.watch("sass/**/*.scss",["sass"]);
  gulp.watch('./**/*.html',['bsReload']);
  gulp.watch('js/**/*.js',['bsReload']);
  gulp.watch('./**/*.css',['bsReload']);
  gulp.watch('./**/*.php',['bsReload']);
});
