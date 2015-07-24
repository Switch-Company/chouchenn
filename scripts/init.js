// Helpers/polyfills
require( './helpers/classList' );
require( './helpers/closest' );
require( './helpers/matchMedia' );
require( './helpers/matchMedia.addListener' );
require( './helpers/requestAnimationFrame' );

// Tools

var _             = require( 'lodash' ),
    fc            = require( './tools/fastclick' ),
    ps            = require( 'pubsub-js' ),
    libs          = {
      module:           require( './modules/module' ),
      fixMenu:          require('./modules/fixMenu')
    };


var Site = function() {

  // Store configuration
  this.conf = _.assign( {}, window.config.conf );
  this.l10n = _.assign( {}, window.config.l10n );
  this.data = {};

  // Modules init
  _.forEach( libs, (function( Lib, key ){
    this[ key ] = new Lib(this);
  }).bind( this ));

  // fastclick
  if( Modernizr.touch ) {
    fc( document.body );
  }


  // Init app
  ps.publish( 'app.start' );
};


new Site();
