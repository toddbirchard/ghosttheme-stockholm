$(document).ready(function() {
  function getRepos() {
    $.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/testing', function(result) {
      for (var index in result) {
        var repo = result[index];
        $('.repos').append('<a href=https://github.com/' + repo['full_name'] + '><div class="repo"><div class="lang ' + repo['language'] + '"><span>' + repo['language'] + '</span></div><div class="details"><h3><i class="fab fa-github"></i> ' + repo['name'] + '</h3><p>' + repo['description'] + '</p><p><img src="' + repo['avatar'] + '"> <span class="author">' + repo['author'] + ' <span></div></div></a>');
      }
    });


    $.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/github_commits', function(result) {
      for (var index in result) {
        var repo = result[index];
        $('.commits').append('<a href=' + repo['commit_url'] + '><div class="commit"><img src="' + repo['avatar'] + '"> <span>commited a change to</span><h4>' + repo['repo'] + '</h4><p>"' + repo['description'] + '"</p><span class="time">' + repo['created'] + '</span></div></a>');

        console.log(repo);
      }
    });
  }
  getRepos();
});
