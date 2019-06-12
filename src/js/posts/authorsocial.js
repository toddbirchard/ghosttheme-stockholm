//import { GraphQLClient } from 'graphql-request';


// Construct Author Query
const query_vars = {
  "slug": "todd"
};
const query = `
  query GetAuthors($slug: String) {
    authors(where: {slug: $slug}) {
      twitter
      linkedin
      quora
      medium
      github
      pocket
    }
  }`;
// Initialize GraphQL Client
const endpoint = process.env.GRAPHQL_API_ENDPOINT;
const token = process.env.GRAPHQL_API_AUTH;
const client = new GraphQLClient(endpoint, {
  headers: {
    'Authorization': token
  }
});

async function execute_query() {
  // Execute
  client.request(query, query_vars)
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

export function get_author_social(){
  var author = document.getElementsByClassName("author");
  execute_query();
}
