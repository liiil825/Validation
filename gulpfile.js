var gulp = require('gulp')
var stylus = require('gulp-stylus')
var server = require('gulp-develop-server')

var autoprefixer = require('autoprefixer-stylus')
var sources = {
  jade: "jade/**/*.jade",
  partials: "partials/**/*.jade",
  stylus: "styl/**/*.styl",
  scripts: "js/**/*.js"
}

gulp.task('stylus', function () {
  return gulp.src( sources.stylus )
    .pipe(
      stylus({
        use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')],
        compress: true
      })
    )
    .pipe( gulp.dest('./demo/css') )
})

gulp.task( 'watch', function() {
  gulp.watch( sources.stylus, ['stylus'] );
  gulp.watch( ['./bin/www'], server.restart );
})

gulp.task( 'server:start', function() {
  server.listen( { path: './bin/www' } );
})

gulp.task( 'default', function(){
  gulp.run( 'server:start', 'watch' )
})
