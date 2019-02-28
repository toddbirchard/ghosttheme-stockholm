require('../src/less/pages.less');

$(document).ready(function() {
  let ghostSearch = new GhostSearch({
    key: '2ba06e23c3fb2a866de96402f0',
    host: 'https://hackersandslackers.com',
    input: '#my-custom-input',
    results: '#my-custom-results',
    options: {
      limit: 5,
      keys: ['title', 'plaintext']
    },
    api: {
      resource: 'posts',
      parameters: {
        fields: [
          'title', 'slug', 'plaintext', 'image', 'feature_image'
        ],
        formats: 'plaintext',
        include: 'tags'
      }
    },
  });
});
