/* global module:true */
module.exports = {
  release: {
    expand: true,
    cwd: '<%=build%>',
    src: ['*.css'],
    dest: '<%=build%>',
    options: {
      report: "gzip"
    }
  }
};
