
/**
 * Dependencies.
 */

var stylus = require('stylus')
  , path = require('path')
  , chouchenn = require('../')
  , fs = require('fs')

var output = fs.readdirSync('test').filter( function( file ){
  return file === 'output';
} );

if( !output.length ){
  fs.mkdirSync( 'test/output' );
}


fs.readdirSync('test/cases').map( function( file ){
    return path.join( 'test/cases', file );
  } ).filter( function( file ){
    return fs.statSync( file ).isDirectory();
  } ).forEach( function( folder ){

  describe( path.basename( folder ), function(){
    var cases = fs.readdirSync( folder ).filter(function(file){
      return ~file.indexOf('.styl');
    }).map(function(file){
      return file.replace('.styl', '');
    });
    cases.forEach(function(test){
      it(test, function(){
        var filePath = folder + '/' + test + '.styl';
        var styl = fs.readFileSync(filePath, 'utf8').replace(/\r/g, '');
        var css = fs.readFileSync(folder + '/' + test + '.css', 'utf8').replace(/\r/g, '').trim();

        var style = stylus(styl)
          .use(chouchenn())
          .set('filename', filePath)
          .define('url', stylus.url())
          .import( 'chouchenn' );

        if (~test.indexOf('compress')) style.set('compress', true);

        style.render(function(err, actual){
          if (err) throw err;
          fs.writeFileSync( 'test/output/' + path.basename( folder ) + '-' + test + '.css', actual );
          actual.trim().should.equal(css);
        });
      })
    });
  } )
} )
