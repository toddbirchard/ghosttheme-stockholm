export function author_pocket(pocket) {

  if (pocket) {
    $(".widget.pocket").css('display', 'block');
    const pocket_key = process.env.POCKET_CONSUMER_KEY;
    const pocket_token = process.env.POCKET_ACCESS_TOKEN;
    let pocketURL = 'https://getpocket.com/v3/get?consumer_key=' + pocket_key + '&access_token=' + pocket_token + '&detailType=complete&count=3';

    $.ajax({
      method: 'GET',
      url: pocketURL,
      dataType: 'jsonp',
      success: function(response) {
        $(".widget.pocket .pocket-articles").append('ayy lol');
        console.log(response);
      }
    });
  }
}
