export function author_pocket(pocket)
  const pocket_key = process.env.POCKET_CONSUMER_KEY;
  const pocket_token = process.env.POCKET_ACCESS_TOKEN;
  let url = 'https://getpocket.com/v3/get?consumer_key=' + pocket_key + '&access_token=' + pocket_token + '&detailType=complete&count=3';
  var headers = {
    "Content-Type": "application/json"
  };

  $.ajax({
    method: 'GET',
    url: url,
    headers: headers,
    dataType: 'jsonp',
    success: function(response) {
      console.log(response);
    }
}
