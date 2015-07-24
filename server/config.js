/* global module: true, __dirname: true */

var path = require('path'),
  rootPath = path.normalize( __dirname + '/..');

module.exports = {
  'files': [ rootPath, 'publish' ].join('/'),
  'pages': [ rootPath, 'pages' ].join('/'),
  'root': rootPath,
  'secret': 'gotta collect them all!',
  'styles': 'styles'
};
