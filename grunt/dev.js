/*global module:false*/
module.exports = function( grunt ){
  grunt.registerTask( 'dev', function(){
    grunt.task.run( [
      'clean:build',
      'copy:files',
      'copy:media',
      'copy:js',
      'copy:datas',
      'config:dev',
      'modernizr:build',
      'notify:dev'
    ] );
  } );
};
