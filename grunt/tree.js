/*global module:false*/
var _ = require( 'lodash' );

module.exports = function( grunt ){

  var tasks = {
    view: {
      files: {
         "tree.json": "<%= build %>/"
      },
      options: {
        type: ["html"]
      }
    }
  };

  _.each( grunt.config.get( 'langs' ), function( lang ){

    tasks[ lang ] = {
      files: [{
         src: "<%= build %>/"+lang,
         dest: "tree-"+lang+".json"
      }],
      options: {
         type: ["html"]
      }
    };

  });

  return tasks;
};
