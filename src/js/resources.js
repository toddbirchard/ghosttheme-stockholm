import '../less/pages/resources.less';
import '../less/posts/responsivetable.less';
import {GraphQLClient} from 'graphql-request';

function create_row(data) {
  for (var i = 0; i < data.length; i++) {
    $('#resources-table tbody').append('<tr> \n ' +
    '<td><img src="' + data[i]['issuetype_icon'] + '" alt="' + data[i]['issuetype_name'] + '"></td> \n ' +
    '<td>' + data[i]['summary'] + '</td> \n ' +
    '<td><a href="' + data[i]['description'] + '">' + data[i]['description'] + '</a></td> \n ' +
    '<td>' + data[i]['issuetype_name'] + '</td> \n ' +
    '</tr>');
  }
}

async function execute_query(query) {
  const endpoint = process.env.GRAPHQL_API_ENDPOINT;
  const token = process.env.GRAPHQL_API_AUTH;

  // Initialize GraphQL Client
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Authorization': token
    }
  });
  client.request(query).then(data => console.log('data = ' + JSON.stringify(data)));
  client.request(query).then(data => create_row(data['resources']));
}

function construct_query() {

  // Structured query
  const query = `{
    resources(orderBy: issuetype_name_DESC) {
      summary
      description
      project
      issuetype_icon
      issuetype_name
      epic_name
      epic_color
      updated
    }
  }`;

  execute_query(query).catch(error => console.error(error));
}

document.onload = construct_query();
