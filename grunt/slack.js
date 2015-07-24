/*global module:false*/
module.exports = {
  options: {
      webhook: 'https://hooks.slack.com/services/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',
      channel: '#eyewear',
      username: 'Deploy bot',
      icon_url: 'https://lh3.googleusercontent.com/-MtJ8vqJfYTo/AAAAAAAAAAI/AAAAAAAAGfU/KUMv-i7iaIE/photo.jpg'
  },

  done_qa: {
    text: '<<%= package.qa_url %>|<%= package.title %>> has been updated on "qa" with <<%= package.repo_url %>/commits/<%= meta.revision %>|<%= meta.revision %>>'
  },

  done_dev: {
    text: '<<%= package.dev_url %>|<%= package.title %>> has been updated on "master" with <<%= package.repo_url %>/commits/<%= meta.revision %>|<%= meta.revision %>>'
  },

  done_uat: {
    text: '<<%= package.uat_url %>|<%= package.title %>> has been updated on "release" with <<%= package.repo_url %>/commits/<%= meta.revision %>|<%= meta.revision %>>'
  }
};
