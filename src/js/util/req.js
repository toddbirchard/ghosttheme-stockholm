export function req(method, url) {
  var request = new XMLHttpRequest();
  request.open(method, url, false);

  request.onload = function() {
    if (request.status >= 200 && request.status < 300) {
      var response = JSON.parse(this.responseText);
      console.log('request done loading now');
      console.log(response);
      return response;
    }
  };

  request.onerror = function() {
    return "ERROR!!";
  };

  request.send();
}
