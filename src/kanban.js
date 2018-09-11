// Renders the the card' information in the table
function displaycards(card) {

  //const numResultsEl = document.getElementById("num-results");
  const tableRows = card.map(card => {
    return `
    <div class="card">
      <h5>${card.summary}</h5>
      <p>${card.document}</p>
      <div style="background-color:${card.issuetype_color};" class="issuetype ${card.issuetype}"><img src="${card.issuetype_url}"></div>
      <div class="info">
      <div class="left">
      <div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div>
      <div class="priority ${card.priority}"><i class="fas fa-arrow-up"></i></div>
      </div>
      <div class="epic ${card.epic_name}"><i class="fas fa-bolt" style=color:${card.epic_color};"></i> <span>${card.epic_name}</span></div>
      </div>
    `;
  });
  cardTableBody.innerHTML = tableRows.join("");
  numResultsEl.innerHTML = card.length;
}
