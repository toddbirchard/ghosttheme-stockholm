import '../src/less/global.less';
import '../src/js/analytics.js';


/*var doAssets = require('do-assets')({
  assetsPath: __dirname+"../assets/dist/", // Path of the folder to upload assets from
  folder: "assets" // name of the folder on DO Spaces
});*/

/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/
/*===========================
 1. function declaretion
 ==========================*/

var themeApp = {
  resizeIframe: function(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
  },
  tags: function() {
    var tags = {
      nodejs: '<i class="fab fa-node-js"></i>',
      aws: '<i class="fab fa-aws"></i>',
      python: '<i class="fab fa-python"></i>',
      django: '<i class="fab fa-python"></i>',
      nosql: '<i class="fab fa-envira"></i>',
      apis: '<i class="fab fa-hubspot"></i>',
      frontend: '<i class="far fa-code"></i>',
      data: '<i class="fas fa-chart-pie"></i>',
      mysql: '<i class="fas fa-database"></i>',
      javascript: '<i class="fab fa-js-square"></i>',
      roundup: '<i class="fas fa-undo-alt"></i>',
      excel: '<i class="fal fa-table"></i>',
      devops: '<i class="fas fa-server"></i>',
      pandas: '<i class="fas fa-paw"></i>',
      datascience: '<i class="fas fa-flask"></i>',
      tableau: '<i class="far fa-asterisk"></i>',
      googlecloud: '<i class="fab fa-google"></i>',
      sql: '<i class="fas fa-database"></i>',
      statistics: '<i class="far fa-chart-area"></i>',
      flask: '<i class="fab fa-affiliatetheme"></i>',
      expressjs: '<i class="fab fa-etsy"></i>',
      atlassian: '<i class="fab fa-trello"></i>',
      codesnippetcorner: '<i class="fal fa-laptop-code"></i>',
      saas: '<i class="fal fa-desktop-alt"></i>',
      datavis: '<i class="fal fa-chart-pie"></i>',
      plotly: '<i class="fas fa-chart-bar"></i>',
      saas: '<i class="fal fa-laptop-code"></i>',
      postgres: '<i class="fas fa-elephant"></i>',
      bigdata: '<i class="far fa-chart-network"></i>'
    };

    for (var key in tags) {
      $('.' + key).find('i').replaceWith(tags[key]);
    }
  },
  githubrepo: function() {
    $('[data-github]').each(function() {
      var _this = this;
      var repo = $(_this).data('github');

      fetch('https://api.github.com/repos/' + repo).then(function(response) {
        return response.json();
      }).then(function(response) {
        $(_this).find('[data-forks]').text(response.forks);
        $(_this).find('[data-stars]').text(response.stargazers_count);
      });
    });
  },
  retina: function() {
    // Order matters!!
    $('img').attr('data-rjs', 2);
    //  $('img').attr('data-rjs', 3);
  },
  contributors: function() {
    $.ajax({
      method: "GET",
      url: "https://apisentris.com/api/v1/users?select=title,linkedin,quora,medium,github,meetup,pocket,slug",
      headers: {
        client_id: "115000",
        access_token: "qWLp79NWuDtVxom5v6_h_g"
      },
      contentType: 'application/json'
    }).done(function(results) {
      for (var i = 0; i < results.length; i++) {
        var title = results[i]['title'];
        var name = results[i]['slug'];
        $('.contributor-container').find('.' + name).find('.role').html(title);
      }
    })
  },
  init: function() {
    themeApp.contributors();
    themeApp.retina();
    themeApp.tags();
  }
};

/* ===========================
2. Initialization
=========================== */
$(document).ready(function() {
  themeApp.init();
});
