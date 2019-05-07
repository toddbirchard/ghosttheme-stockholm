function get_issues_per_column(){
  const base_url = 'https://apisentris.com/api/v1/';
  const client_id = 170000;
  const token = 'ozzdesqDfyznziySqQ8Hnw'
}

export function fetch_issues(){
  function BacklogCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.Backlog&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'backlog');
      });
    }

    function TodoCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.To%20Do&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'todo');
      });
    }

    function ProgressCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.In%20Progress&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'progress');
      });
    }

    function DoneCards() {
      $.ajax({
        method: "GET",
        url: "https://apisentris.com/api/v1/jira_issues?status=like.Done&limit=6&order_by=updated.desc",
        headers: {
          client_id: "115000",
          access_token: "qWLp79NWuDtVxom5v6_h_g"
        },
        contentType: 'application/json'
      }).done(function(results) {
        populateCards(results, 'done');
      });
    }
}
