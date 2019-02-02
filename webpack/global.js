import '../src/less/global.less';
import '../src/js/global.js';
import '../src/js/analytics.js';
import GhostSearch from 'ghost-search'

/*var doAssets = require('do-assets')({
  assetsPath: __dirname+"../assets/dist/", // Path of the folder to upload assets from
  folder: "assets" // name of the folder on DO Spaces
});*/
$(document).ready(function() {
  let ghostSearch = new GhostSearch({
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
          'title', 'slug', 'plaintext', 'image'
        ],
        formats: 'plaintext',
        include: 'tags'
      }
    },
    template: function(result) {
      let tag = result.tags[0];
      let url = [location.protocol, '//', location.host].join('');
      return '<li> \n' + '<img src="' + result.feature_image + '" alt="' + result.title + '"> \n ' + '<div><a href="' + result.url + '">' + result.title + '</a> \n' + '<span class="tag "> <span class="' + tag.slug + '"><i class="fas fa-tags"></i> ' + tag.name + '</span></span></div> \n ' + '</li>';
    }
  });
});
