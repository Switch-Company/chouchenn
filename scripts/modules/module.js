/* global module */

var ps = require( 'pubsub-js' );

module.exports = function() {

  // store selectors
  this.els = {};

  // Store Datas
  this.data = {};

  this.bind = function() {};

  this.dom = function() {};

  this.init = function() {
    this.dom();
    this.bind();
  };

  ps.subscribe( 'app.start', this.init.bind( this ));

  return {};
};
