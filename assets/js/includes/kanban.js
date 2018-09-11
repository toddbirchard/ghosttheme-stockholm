$(document).ready(function() {
  function populateCards(cards){
    console.log('backlog = ', cards);
    for (var i = 0; i < cards.length; i++) {
      console.log('issue = ' + cards[i]);
      fetch('../../partials/jiracard.hbs', '#backlog .cards', {title: 'test'});
    }
  }

  const clientPromise = stitch.StitchClientFactory.create('hackers-authors');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('HackersBlog');
    client.login().then(() =>
      db.collection('jira').find({status: 'Backlog'}).limit(10).execute()
    ).then(docs => {
      console.log("Found docs", docs)
      console.log("[MongoDB Stitch] Connected to Stitch")
      //populateCards(docs)
    }).catch(err => {
      console.error(err)
    });
  });

});
