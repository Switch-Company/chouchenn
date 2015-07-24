/*global module:false*/
module.exports = function(){

  return {
    config: {
      files: [ 'config/**/*' ],
      tasks: [ 'config:dev' ],
      options: {
        livereload: true
      }
    },
    datas: {
      files: [ 'datas/**/*' ],
      tasks: [ 'copy:datas' ],
      options: {
        livereload: true
      }
    },
    gruntfile: {
      files: 'Gruntfile.js',
      tasks: [ 'jshint:gruntfile' ]
    },
    media: {
      files: [ 'media/**/*','!media/sprite' ],
      tasks: [ 'copy:img', 'notify:media' ],
      options: {
        livereload: true
      }
    },
    js: {
      files: [ 'scripts/**/*' ],
      tasks: [ 'jshint:dev' ],
      options: {
        livereload: true
      }
    },
    reload: {
      files: [ 'styles/**/*', 'pages/**/*'  ],
      options: {
        livereload: true
      }
    }
  };
};
