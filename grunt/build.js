/* global module:false */
var _ = require( 'lodash' );
module.exports = function( grunt ) {

  grunt.config.set( 'build', 'release' );

  var tasks = [
    'clean:build',
    'modernizr:release',
    'copy:files'
  ];

  tasks.push(
    'jade',
    'treeview',
    'js:release',
    'config:release',
    'stylus:release',
    'cssmin:release'
    //'imagemin',
  );

  _.each( grunt.config.get( 'langs' ), function( lang ){
    tasks.push( [ 'copy', lang ].join(':') );
  } );

  tasks.push(
    'clean:temp',
    'notify:build'
  );

  grunt.registerTask( 'build', function(){

    grunt.task.run( tasks );

  } );
};
