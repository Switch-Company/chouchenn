/* global module: false */
module.exports = {
  dev: {
    expand: true,
    cwd: 'assets/icons',
    src: [ '**/*.svg' ],
    dest: 'media/svg',
    options : {
      shape: {
        id: {
          generator: function(name){
            return 'icon-' + name.split('.svg')[0];
          }
        }
      },
      mode: {
        symbol: {
          sprite: 'icons',
          dest: '.',
          inline: true
        }
      }
    }
  }
};
