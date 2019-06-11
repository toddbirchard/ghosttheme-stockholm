import '../less/pages/resources.less';
import '../less/posts/table.less';


function create_rows(data) {
  for (var i = 0; i < data.length; i++) {
    $('#resources-table tbody').append('<tr> \n ' +
    '<td><img src="' + data[i]['issuetype_icon'] + '" alt="' + data[i]['issuetype_name'] + '"></td> \n ' +
    '<td>' + data[i]['summary'] + '</td> \n ' +
    '<td><a href="' + data[i]['description'] + '">' + data[i]['description'] + '</a></td> \n ' +
    '<td>' + data[i]['issuetype_name'] + '</td> \n ' +
    '</tr>');
  }
}

function fetch_resource_issues() {
  const endpoint = process.env.RESOURCES_ENDPOINT;
  $.ajax({
    method: "GET",
    url: endpoint,
    context: document.body
  }).done(function(results) {
    create_rows(JSON.parse(results));
  });
}

document.onload = fetch_resource_issues();
