import ScrollBooster from 'scrollbooster';

export function scrollable_tables() {
  let tables = document.getElementsByClassName('tableContainer');
  for (let table of tables) {
    let content = table.querySelector('tbody');
    let sb = new ScrollBooster({
      viewport: table,
      content: content,
      handle: content,
      emulateScroll: false,
      mode: 'x',
      bounce: true,
      bounceForce: .1,
      onUpdate: (data) => {
        // your scroll logic goes here
        content.style.transform = `translateX(${ - data.position.x}px)`
      }
    });
  }
  $(".tableContainer").each(function(index, element) {
    const table = $(element).find('table');
    const tablewidth = table.width();
    if ($(element).width() < tablewidth) {
      $(element).find('table').addClass('handscroller');
      $(element).append('<div class="tablefade"></div>');
    }
  });
}

export function scrollable_code() {
  let snippets = $('pre');
  for (let snippet of snippets) {
    let content = snippet.querySelector('code');
    let sb = new ScrollBooster({
      viewport: snippet,
      content: content,
      handle: content,
      emulateScroll: false,
      mode: 'x',
      bounce: true,
      bounceForce: .1,
      onUpdate: (data) => {
        // your scroll logic goes here
        content.style.transform = `translateX(${ - data.position.x}px)`
      }
    });
  }
  $("pre").each(function(index, element) {
    let codesnippet = $(element).find('code');
    let codesnippetwidth = codesnippet.width();
    if ($(element).width() < codesnippetwidth) {
      $(element).find('code').addClass('handscroller');
      //$(element).append('<div class="tablefade"></div>');
    }
  });
}
