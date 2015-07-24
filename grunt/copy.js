/*global module:false*/
var _ = require( 'lodash' );

module.exports = function( grunt ){
  var tasks = {
    datas: {
      files: [{
          expand: true,
          cwd: 'datas',
          src: [ '**/*' ],
          dest: '<%= build %>datas/'
      }]
    },
    files: {
      files: [{
          expand: true,
          src: [ '.htaccess', '.htpasswd', 'favicon.ico', 'CNAME' ],
          dest: '<%= build %>/'
      }]
    },
    js: {
      files: [{
          expand: true,
          cwd: 'scripts',
          src: [ 'vendors/**/*.js' ],
          dest: '<%= build %>js/'
      }]
    },
    media: {
      files: [{
        expand: true,
        src: [ 'media/**/*'],
        dest: '<%= build %>/'
      }]
    },
    img: {
      files: [{
        expand: true,
        src: [ 'media/img/**/*', 'media/dyn/**/*', 'media/icons/**/*'],
        dest: '<%= build %>/'
      }]
    },
    fonts: {
      files: [{
        expand: true,
        src: [ 'media/fonts/**/*'],
        dest: '<%= build %>/'
      }]
    }
  };

  _.each( grunt.config.get( 'langs' ), function( lang, baseFolder ){
    tasks[ lang ] = {
      files:  [
        // js/*
        {
          expand: true,
          cwd: 'temp/js/',
          src: [ '**/*' ],
          dest: '<%= build %>/'+lang+'/js'
        },
        // vendors/*
        {
          expand: true,
          cwd: 'scripts/',
          src: [ 'vendors/**/*.js' ],
          dest: '<%= build %>/'+lang+'/js'
        },
        // media/*
        {
          expand: true,
          cwd: 'media/',
          src: [ '**/*', '!dyn/**' ],
          dest: '<%= build %>/'+lang+'/media'
        },
        // datas/*
        {
          expand: true,
          cwd: 'datas/',
          src: [ '**/*' ],
          dest: '<%= build %>/'+lang+'/datas'
        },
        // media/dyn
        {
          expand: true,
          cwd: 'media/dyn/'+baseFolder,
          src: [ '**/*' ],
          dest: '<%= build %>/'+lang+'/media/dyn'
        }
      ]
    };
  } );



  return tasks;
};
