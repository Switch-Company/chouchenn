/* global module:false */
var _ = require( 'lodash' ),
    datas,
    l10n,
    langs,
    tasks = {};

module.exports = function(grunt){

  datas = grunt.config.get( 'jadedatas' );
  langs = grunt.config.get( 'langs' );
  _.each( datas, function( data, key ){

    l10n = langs[ key ] === 'en_US' ? '' : langs[ key ];


    tasks[ key ] = {
      files: [{
        expand: true,
        cwd: 'pages/',
        src: [ '**/*.jade', '!_**/*.jade', '!_*.jade', "!tree.jade" ],
        ext: '.html',
        dest: '<%= build %>'+l10n
      }],
      options: {
        data: data,
        pretty: true,
        selfClose: true,
        compileDebug: false
      }
    };
  } );

  return tasks;
};
