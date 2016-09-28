// gulpプラグインの読みこみ
var gulp = require('gulp'),
		scss = require( 'gulp-sass' ),
		imagemin = require( 'gulp-imagemin' ),//画像圧縮
		imageminPngquant = require( 'imagemin-pngquant' ),//png画像の圧縮
		plumber = require( 'gulp-plumber' ),//エラー通知
		notify = require( 'gulp-notify' ),//エラー通知
		pleeease = require( 'gulp-pleeease' ),//ベンダープレフィックス
		browserSync = require( 'browser-sync' ),
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
	gulp.src( paths.rootDir + 'scss/**/*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}) )
		.pipe( scss() )
		.pipe( pleeease() )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( paths.rootDir + 'css' ) );
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
	// browserSyncが、MAMPのディレクトリ構造と紐づきます
	browserSync({
		proxy: "localhost:8888",
		startPath: "/rish/"
	});
});

/**
* Task
 */
gulp.task('HTML:reload', function() {
	gulp.src('./**/*.html')
		.pipe( browserSync.reload({ stream:true }) );
})
gulp.task('PHP:reload', function() {
	gulp.src('./**/*.php')
		.pipe( browserSync.reload({ stream:true }) );
})
gulp.task('JS:reload', function() {
	gulp.src('./**/*.js')
		.pipe( browserSync.reload({ stream:true }) );
})



/**
* Command
 */
gulp.task('default', ['browser-sync'],function(){
	gulp.watch( paths.rootDir + 'scss/**/*.scss', ['scss'] );
	gulp.watch('./**/*.php',['PHP:reload']);

	// **
	// HTMLやJSなどがあれば、下記を有効にする
	// *
	// gulp.watch('./**/*.html',['HTML:reload']);
	// gulp.watch('./**/*.js',['JS:reload']);
});
