var yaml = require('js-yaml'),
    _ = require( 'lodash' ),
    fs   = require('fs'),
    path = require( 'path' ),
    jadeLang = {};

module.exports = function( app, config ){

  var contents = fs.readFileSync( './locales/site.yaml', 'utf8' ),
      jadeConf = yaml.load( contents );

  function getLang( req, res, next ){
    var lang = req.params.lang || req.params[ 0 ],
        locale;

    if( jadeConf.baseUrl ){
      locale = _.findKey( jadeConf.baseUrl, function( locale ){
        return locale === lang;
      } );
    }

    req.locale = locale || lang;

    if( !app.baseUrl ) {
      app.baseUrl = [];
    }

    if( !app.baseUrl[ lang ] ){
      app.baseUrl[ lang ] = req.locale;
    }

    next();
  }

  // function redirect( req, res ){
  //   var lang = jadeConf.defaultLang;
  //   if( lang ){
  //     if( jadeConf.baseUrl && jadeConf.baseUrl[ jadeConf.defaultLang ] ){
  //       lang = jadeConf.baseUrl[ jadeConf.defaultLang ];
  //     }
  //     res.redirect( [ '/', lang, '/' ].join('') );
  //   }
  //   else{
  //     res.send( '<code>defaultLang</code> is not defined in <code>locales/site.yaml</code>' );
  //   }
  // }

  function setLang( lang ){
     var conf,
        // copy jadeConf
        langConf = _.assign( {}, jadeConf ),
        files = fs.readdirSync( './locales/' + lang ),
        isYAML;

     _.each( files, function( file ) {

      isYAML = path.extname( file ) === '.yaml' || path.extname( file ) === '.yml';

      if ( isYAML ) {
        conf = yaml.load( fs.readFileSync( './locales/' + lang + '/' + file, 'utf8' ) );
        _.merge( langConf, conf );
      }

    });

     // _.each( langConf.url, function( path, name ){
     //  langConf.url[ name ] = [ '/', langConf.lang, '/', path ].join('');
     // } );


    jadeLang[ lang ] = langConf;
  }

  var pages = function( req, res ){
    var lang = req.locale || jadeConf.defaultLang;
    if( !jadeLang[ lang ] ){
      setLang( lang );
    }

    var filename = path.basename( req.url, '.html' );
    res.render( filename, _.assign( jadeLang[ lang ], {dev:true} ) );
  };

  var home = function( req, res ){
    var lang = req.locale || jadeConf.defaultLang;
    if( !jadeLang[ lang ] ){
      setLang( lang );
    }

    // Get pages list
    var list = fs.readdirSync( config.pages ),
        obj = {};

    _.each( list, function( item ) {

      if( ~item.indexOf( '.jade' ) ){
        var name = path.basename( item, '.jade' );
        obj[ name ] = name+".html";
      }

    });

    res.render( './index', _.assign( jadeLang[ lang ], {dev:true, tree:obj} ) );
  };

  app.all( '/:lang', getLang );

  app.get( '/:lang/', home );
  app.get( '/', home );

  //app.all( '/:lang/*', getLang );
  app.all( /\/(\w+)\/(.*)/, getLang );

  // redirect root to default lang
  // app.get( '/', redirect );

  // JS|Media
  app.get( /\/(.*)\/(js|media|datas)\/(.*)/, function( req, res ) {
    var lang = req.locale,
        folder = req.params[ 1 ],
        url = req.params[ 2 ];

      if ( !!~ url.indexOf( 'dyn' ) ) {
        res.sendFile( config.files + '/' + folder + '/dyn/' + lang + '/' + url.replace( 'dyn/', '' ) );
      }
      else if( !!~ url.indexOf( 'config.js' ) ) {
        res.sendFile( config.files + '/config/' + lang + '/' + url );
      }
      else if( !!~ url.indexOf( 'product.js' ) ) {
        res.sendFile( config.files + '/config/' + lang + '/' + url );
      }
      else if( !!~ url.indexOf( 'compare.js' ) ) {
        res.sendFile( config.files + '/config/' + lang + '/' + url );
      }
      else {
        res.sendFile( config.files + '/' + folder + '/' + url );
      }
  });

  // home
  app.get( '/:lang', pages );

  // Pages
  app.get( /\/(\w+)\/(.*)/, pages );

};
