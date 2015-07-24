/* global module: false */
module.exports = {
  build: {
    devFile: 'remote',
    outputFile: '<%= build%>js/modernizr.js',

    extra: {
      cssclasses: true,
      cssgradients: true,
      load: false,
      touch: true,
      shiv: true
    },

    extensibility: {
      prefixed: true,
      testprop: true,
      testallprops: true,
      domprefixes: true,
      teststyles: true
    },

    // tests: [
    //   'requestanimationframe',
    //   'forms_placeholder'
    // ],

    customTests: [],

    matchCommunityTests: true,
    uglify: false,
    parseFiles: false
  },

  release: {
    devFile: 'remote',
    outputFile: 'temp/js/modernizr.js',

    extra: '<%= modernizr.build.extra %>',

    extensibility: '<%= modernizr.build.extensibility %>',

    // tests: '<%= modernizr.build.tests %>',

    customTests: '<%= modernizr.build.customTests %>',

    matchCommunityTests: '<%= modernizr.build.matchCommunityTests %>',
    uglify: '<%= modernizr.build.uglify %>',
    parseFiles: '<%= modernizr.build.parseFiles %>'
  }
};
