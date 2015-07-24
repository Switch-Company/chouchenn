/* global module */
var sqrt = function( value ) {

  return Math.sqrt( value.val ) + value.type;

};

var plugin = function() {
  return function( style ) {
    var nodes = this.nodes;
    style.define( 'sqrt', function( value ) {
      return new nodes.Ident( sqrt( value ) );
    });
  };
};
module.exports = plugin;
