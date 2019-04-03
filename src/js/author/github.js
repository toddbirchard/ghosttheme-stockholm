export function author_github(github, author_slug) {
  $("#github-card-author").attr('data-username', github);
  new GitHubCard({template: '#github-card-author'}).init();
}
