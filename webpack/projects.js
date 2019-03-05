require('../src/less/projects.less');
import { request } from 'graphql-request'
import '../src/js/kanban.js'
import 'slick-carousel'

function runQuery(status){
  var query = `{
      jiraissueses(where: {status: "` + status + `"}, orderBy: updated_DESC, first: 6) {
           key
           status
           summary
           assignee
           priority
           issuetype
           epic_name
           updated
           rank
           timestamp
           project
      }
  }`
  request('https://198.199.74.176:4466', query)
  .then(data => {
    populateCards(data['jiraissueses'])
  }
  ).catch(err => {
    console.log(err.response.errors) // GraphQL response errors
    console.log(err.response.data) // Response data if available
  });
}

function main() {
  runQuery("Backlog");
}

main();
