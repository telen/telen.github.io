var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var child = require('child_process');
var browserSync = require('browser-sync').create();

gulp.task('sass', () => {
  return gulp.src('_sass/main.scss')
           .pipe(sass())
		   .pipe(gulp.dest('_site/css'));
});

gulp.task('jekyll', () => {
    var jekyll = child.spawn('jekyll', ['build',
        '--watch',
        '--incremental',
        '--drafts'
        ]);

	var jekyllLogger = (buffer) => {
        buffer.toString()
        .split('/\n/')
        .forEach((message) => gutil.log('Jekyll: ' + message));
    
};

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

});

gulp.task('serve', () => {
  browserSync.init({
    files: ['_site/**'],
    port: 4000,
	server: {
      baseDir: '_site'
    }
  });

  gulp.watch('_sass/*.scss', ['sass']);
  gulp.watch(['*.html', '_layout/*', '_includes/*', '_posts/*'], ['jekyll'])
});

gulp.task('default', ['sass', 'jekyll', 'serve']);

