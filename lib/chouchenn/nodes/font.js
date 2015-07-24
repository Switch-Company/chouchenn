/* global module */
var fontUrl = function( path, types, name ) {
  var fonts = types.val.split( ' ' ),
      url = [];

  for ( var i = 0, len = fonts.length; i < len; ++ i ) {

    switch( fonts[ i ] ) {
      case 'eot':
        url.push( 'url("' + path.string +  '.eot?#iefix") format("embedded-opentype")' );
        break;
      case 'svg':
        url.push( 'url("' + path.string +  '.svg#' + name.string + '") format("svg")' );
        break;
      case 'ttf':
        url.push( 'url("' + path.string +  '.ttf") format("truetype")' );
        break;
      default:
        url.push( 'url("' + path.string +  '.' + fonts[ i ] + '") format("' + fonts[ i ] + '")' );
        break;
    }
  }

  return url.join( ',' );

};

var plugin = function() {
  return function( style ) {
    var nodes = this.nodes;
    style.define( 'fontUrl', function( path, types, name ) {
      return new nodes.Ident( fontUrl( path, types, name ) );
    });
  };
};
module.exports = plugin;
