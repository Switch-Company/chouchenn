/* global module:false */
var _ = require( 'lodash' );

module.exports = function( grunt ) {

  var baseVars = grunt.file.readYAML( 'locales/site.yaml' ),
      config = grunt.file.readYAML( 'config/config.yaml' ),
      configVars = {},
      productVars = {},
      compareVars = {},
      langs = {};

  grunt.registerTask( 'loadConfig', function(){

    var data, prettyName;
    grunt.file.recurse('config/', function(abspath, rootdir, subdir, filename){

      if( filename.indexOf('yaml') !== -1 && subdir ){
        data = grunt.file.readYAML(abspath);

        var vars = configVars,
            file = config;

        if( filename === 'product.yaml' ){
          vars = productVars;
          file = product;
        }

        if( filename === 'compare.yaml' ){
          vars = compareVars;
          file = compare;
        }

        if( !vars[ subdir ] ){
          if( baseVars.baseUrl && baseVars.baseUrl[ subdir ] ){
            prettyName = baseVars.baseUrl[ subdir ];
          }
          else {
            prettyName = subdir;
          }
          langs[ subdir ] = prettyName;
          vars[ subdir ] = _.assign( {}, file );
        }


        _.merge( vars[ subdir ], data );

      }
    });

  });

  grunt.registerTask( 'createConfig:dev', function(){

    _.each( configVars, function( data, key ){
      var jsString = 'window.config = ' + JSON.stringify( data, null, 2 ) + ";";
      grunt.file.write( grunt.config.data.build + '/config/' + langs[ key ] + '/config.js', jsString );
    });

    _.each( productVars, function( data, key ){
      var jsString = 'window.product = ' + JSON.stringify( data, null, 2 ) + ";";
      grunt.file.write( grunt.config.data.build + '/config/' + langs[ key ] + '/product.js', jsString );
    });

    _.each( compareVars, function( data, key ){
      var jsString = 'window.compare = ' + JSON.stringify( data, null, 2 ) + ";";
      grunt.file.write( grunt.config.data.build + '/config/' + langs[ key ] + '/compare.js', jsString );
    });

  });

  grunt.registerTask( 'createConfig:release', function(){

    _.each( configVars, function( data, key ){
      var jsString = 'window.config = ' + JSON.stringify( data, null, 2 ) + ";";
      grunt.file.write( grunt.config.data.build + langs[ key ] + '/js/config.js', jsString );
    });

    _.each( productVars, function( data, key ){
      var jsString = 'window.product = ' + JSON.stringify( data, null, 2 ) + ";";
      grunt.file.write( grunt.config.data.build + langs[ key ] + '/js/product.js', jsString );
    });

    _.each( compareVars, function( data, key ){
      var jsString = 'window.compare = ' + JSON.stringify( data, null, 2 ) + ";";
      grunt.file.write( grunt.config.data.build + langs[ key ] + '/js/compare.js', jsString );
    });

  });

  grunt.registerTask( 'config:dev', function(){

    grunt.task.run( [
      'loadConfig',
      'createConfig:dev'
    ] );

  });


  grunt.registerTask( 'config:release', function(){

    grunt.task.run( [
      'loadConfig',
      'createConfig:release'
    ] );
});

};
