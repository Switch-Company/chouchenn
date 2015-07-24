/*global module:false*/
var _ = require( 'lodash' );
module.exports = function( grunt ){
  require( 'time-grunt' )( grunt );

  // test GIT branch: if release, publish folder name = "release", else "publish"
  var buildDir = 'release/',
      jadeVars = {},
      langs = {},
      baseVars = grunt.file.readYAML( 'locales/site.yaml' );

  // read several yaml for jade datas
  var data, prettyName;
  grunt.file.recurse('locales/', function(abspath, rootdir, subdir, filename){

    if( filename.indexOf('yaml') !== -1 && subdir ){
      data = grunt.file.readYAML(abspath);

      if( !jadeVars[ subdir ] ){
        if( baseVars.baseUrl && baseVars.baseUrl[ subdir ] ){
          prettyName = baseVars.baseUrl[ subdir ];
        }
        else {
          prettyName = subdir;
        }
        langs[ subdir ] = prettyName;
        jadeVars[ subdir ] = _.assign( {}, baseVars );
      }

      _.merge( jadeVars[ subdir ], data );

    }
  });

  grunt.config.set('langs', langs);
  grunt.config.set('jadedatas', jadeVars);

  // default grunt configuration
  var defaults = {
    build: buildDir,
    verbose: true,
    paths: {
      dyn: 'media/dyn',
      img: 'media/img'
    }
  };

  require('jit-grunt')( grunt );

  require('load-grunt-config')(grunt, {
    config: defaults
  });

  grunt.registerTask( 'default', [ 'concurrent' ] );

};
