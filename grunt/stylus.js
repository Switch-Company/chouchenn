/*global module:false*/
var path = require( 'path' ),
    chouchenn = require( 'chouchenn' ),
    autoprefixer = require( 'autoprefixer-stylus' );

module.exports = function( grunt ) {

  var langs = grunt.config.get( 'langs' );

  return {
    release:{
      files: [{
        expand: true,
        cwd: 'styles/_l10n',
        src: [ '**/*.styl', '!**/_*.styl', '!_*/**/*.*', '!**/_**/*.styl', '!**/_**/**/*.styl' ],
        dest: '<%= build %>',
        rename: function( dest, matchedSrcPath ){
          var lang = path.dirname( matchedSrcPath ),
              file = path.basename( matchedSrcPath );
          return path.join(dest, langs[ lang ], 'css', file);
        },
        ext: '.css'
      }],
      options: {
        'use': [ chouchenn, function() { return autoprefixer({ browsers: [ 'last 2 versions', 'ie >= 9' ] }); }  ],
        'import': [ 'chouchenn' ],
        'compress': true
      }
    }
  };
};
