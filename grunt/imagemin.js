/*global module:false*/
module.exports = {
  media: {
    options: {
      // For PNGs
      optimizationLevel: 4,
      progressive: true
    },
    files: [{
       // Enable dynamic expansion
      expand: true,
      // Src matches are relative to this path
      cwd: 'media',
      // Actual patterns to match
      src: ['{dyn,icons,img}/**/*.{gif,jpg,jpeg,png,svg}'],
      // Destination path prefix
      dest: 'media/'
    }]
  }
};
