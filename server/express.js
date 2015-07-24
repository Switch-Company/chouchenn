/* global module: true */

var logger = require( 'morgan' ),
    files = require( 'serve-static' ),
    session = require( 'express-session' ),
    stylus = require( 'stylus' ),
    chouchenn = require( 'chouchenn' ),
    autoprefixer = require( 'autoprefixer-stylus' ),
    favicon = require( 'serve-favicon' ),
    browserify = require('browserify-middleware'),
    env,
    path = require( 'path' );

module.exports = function( app, config ){

  env = app.get( 'env' );

  app.disable( 'etag' );

  app.set('showStackError', 'development' === env ? false : true);

  app.use( favicon( 'publish/favicon.ico' ) );

  app.use( session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
  }) );

  // stylus
  app.use( stylus.middleware( {
    src: function( filepath ){
      var lang = filepath.split('/')[0],
          langBaseUrl = '';

      if ( app.baseUrl && app.baseUrl[ lang ] ) {
        langBaseUrl = app.baseUrl[ lang ];
      }

      return [ config.styles, '_l10n', langBaseUrl, path.basename( filepath ).replace( 'css', 'styl' ) ].join('/');
    },
    dest: config.files,
    compile: function( str, path ){
       return stylus(str)
         .set('filename', path)
         .set('compress', 'development' === env ? false : true )
         .set('sourcemap', 'development' === env ? {
            'inline': true
          } : false )
         .use(chouchenn())
         .import('chouchenn')
         .use( autoprefixer( { browsers: [ 'last 2 versions', 'ie >= 8', 'Android >= 4.3' ] } ) );
    }
  } ) );

  // browserify
  app.use( '/:lang/js/scripts.js', browserify( 'scripts/init.js', { debug: true, minify: false, precompiled: false } ) );

  // setup root folder
  app.use( files( config.files, {
    'index': '/'
  } ) );

  app.use( logger( 'dev' ) );

  app.set('views', config.pages );
  app.set('view engine', 'jade');

  app.locals.pretty = true;

};
