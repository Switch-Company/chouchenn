/*!
 * chouchenn
 * Copyright (c) 2014 Switch Team <hello@switch-company.com>
 * MIT Licensed
 */

var path = require( 'path' );

exports = module.exports = plugin;

exports.version = require( path.join( __dirname, '../package.json' ) ).version;

exports.path = __dirname;

// return the plugin callback for stylus
function plugin(){
  return function( style ){
    style.include( __dirname );
  };
}
