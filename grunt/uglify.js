/* global module: false */
module.exports = {
  options: {
    banner: '<%= banner %>',
    wrap: 'test',
    exportAll: true,
  },
  dist: {
    files: {
      'temp/js/scripts.js': 'temp/js/scripts.js'
    }
  }
};
