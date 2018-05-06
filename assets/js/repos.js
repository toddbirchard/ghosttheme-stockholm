$(document).ready(function() {
  function getRepos() {
    $.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/testing', function(result) {
      for (var index in result) {
        var repo = result[index];
        $('.repos').append('<a href=https://github.com/' + repo['full_name'] + '><div class="repo"><div class="lang ' + repo['language'] + '"><span>' + repo['language'] + '</span></div><div class="details"><h3><i class="fab fa-github"></i> ' + repo['name'] + '</h3><p>' + repo['description'] + '</p><p><img src="' + repo['avatar'] + '"> <span class="author">' + repo['author'] + ' <span></div></div></a>');
      }
    });


    /*$.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/github_commits', function(result) {
      for (var index in result) {
        var repo = result[index];
        $('.commits').append('<a href=' + repo['commit_url'] + '><div class="commit"><img src="' + repo['avatar'] + '"> <span>commited a change to</span><h4>' + repo['repo'] + '</h4><p>"' + repo['description'] + '"</p><span class="time">' + repo['created'] + '</span></div></a>');
      }
    });*/

    $.get('https://qky5pkgwmg.execute-api.us-east-1.amazonaws.com/github/github-activity', function(result) {
      for (var index in result) {
        console.log(result)
        var repo = result[index];
        var commits_array = repo['description'].split(',');
        var created_array = repo['created'].split(',');
        var commits_length = commits_array.length;

        var newItem = $('<a href=https://github.com/' + repo['repo_name'] + '><div class="activity"><div class="intro"><h3>' + commits_length + '</h3><div class="summary"><span>changes made to</span><h4>' + repo['repo_name'] + '</h4></div></div><div class="body"><span class="author"><img src="' + repo['avatar'] + '">' + repo['author'] + ' made the following commits:</span><ul></ul></div></div></a>');
        $('.feed').append(newItem);
        $.each(commits_array, function(i, value) {
          var date = created_array[i].split('T')[0].split('2018-')[1].replace('-', '/');
          newItem.find('ul').append('<li><span class="date">' + date + '</span>' + '"' + value.replace(' ', '') + '"</li>');
        });
      }
    });


  }
  getRepos();
});
