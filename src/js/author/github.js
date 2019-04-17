export function author_github(github) {
  $("#github-card-author").attr('data-username', github);
  new GitHubCard({template: '#github-card-author'}).init();
  $(".author-github").css('display', 'block');
}
