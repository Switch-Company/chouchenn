/*global module:false*/
module.exports = {
  start: {
      tasks: ['nodemon', 'watch', 'notify:server'],
      options: {
          logConcurrentOutput: true
      }
  }
};
