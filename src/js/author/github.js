function author_github(github) {
  if (github) {
    $('.sidebar').append('<div class="widget"><div class="content"><h4 class="title">Github</h4><div id="github-card" data-max-repos="3" data-header-text="Repositories" data-username="' + github + '"></div></div></div>');
  }
}
