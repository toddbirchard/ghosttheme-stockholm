$(document).ready(function(){
  function populateCards(cards, status) {
      for (var i = 0; i < cards.length; i++) {
        $('#' + status + ' .cards').append('<div class="card"> \n' +
          '<h5>' + cards[i].summary + '</h5> \n' +
          //'<p>' + cards[i].description + '</p> \n' +
          '<div style="background-color:' + cards[i].issuetype_color + ';" class="issuetype ' + cards[i].issuetype + '"><img src="' + cards[i].issuetype_url + '"></div> \n' +
          '<div class="info"> \n' +
            '<div class="left"> \n' +
              '<div class="avatar"><img src="https://www.gravatar.com/avatar/9eb3868db428fb602e03b3059608199b?s=250&d=mm&r=x"></div> \n' +
              '<div class="priority ' + cards[i].priority + '"><i class="fas fa-arrow-up"></i></div> \n' +
            '</div> \n' +
            '<div class="epic ' + cards[i].epic_name + '"><span>' + cards[i].epic_name + '</span> <i class="fas fa-bolt" style=color:' + cards[i].epic_color + ';"></i></div> \n' +
          '</div> \n' +
        '</div>');
      }
      $('#' + status).append('<span class="count"></span>');
    }

    const backlogColumn = document.getElementById("backlog");
    const todoColumn = document.getElementById("todo");
    const progressColumn = document.getElementById("inprogress");
    const doneColumn = document.getElementById("done");

			{{!-- Gets JIRS cards --}}

    stitchClient.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      db.collection('jira').find({status: 'Backlog', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug']}, priority: { $in: ['Highest', 'High', 'Medium']}}).limit(6).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'backlog')
      }).catch(err => {
      console.error(err)
    });

    stitchClient.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      db.collection('jira').find({status: 'To Do', issuetype: { $in: ['Task', 'Story', 'Integration', 'Bug', 'Data', 'Story', 'Idea', 'Content']}}).limit(6).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'todo')
      }).catch(err => {
      console.error(err)
    });

    stitchClient.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      db.collection('jira').find({status: 'In Progress', issuetype: { $in: ['Task', 'Story', 'Integration', 'Bug', 'Content', 'Integration', 'Story', 'Idea', 'Data']}}).limit(6).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'progress')
      }).catch(err => {
      console.error(err)
    });

    stitchClient.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      db.collection('jira').find({status: 'Done', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug']}}).limit(6).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'done')
      }).catch(err => {
      console.error(err)
    });

		{{!-- Counts number of cards --}}

    stitchClient.callFunction("numCards", ["Backlog"]).then(result => {
        $('#backlog .count').text(result + ' issues');
    });

    stitchClient.callFunction("numCards", ["To Do"]).then(result => {
        $('#todo .count').text(result + ' issues');
    });

    stitchClient.callFunction("numCards", ["In Progress"]).then(result => {
        $('#progress .count').text(result + ' issues');
    });

    stitchClient.callFunction("numCards", ["Done"]).then(result => {
        $('#done .count').text(result + ' issues');
    });


    var swiper = new Swiper('.swiper-container', {
       height: 1000,
       noSwiping: true,
       spaceBetween: 8,
       centeredSlides: false,
       slidesPerView: 4,
       grabCursor: false,
       pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
       breakpoints: {
      // when window width is <= 320px
        1000: {
          slidesPerView: 2,
          noSwiping: false,
          grabCursor: true,
          initialSlide: 0,
          centeredSlides:false
        },
        800: {
          slidesPerView: 2,
          noSwiping: false,
          grabCursor: true,
          //slidesOffsetBefore: 20,
          //slidesOffsetAfter: 20,
        },
        600: {
          slidesPerView: 1,
          noSwiping: false,
          slidesPerColumnFill: 'column',
          grabCursor: true,
          //slidesOffsetBefore: 20,
          //slidesOffsetAfter: 20,
        },
        400: {
          slidesPerView: 1,
          noSwiping: false,
          slidesPerColumnFill: 'column',
          grabCursor: true,
          //slidesOffsetBefore: 20,
          //slidesOffsetAfter: 20,
        }
     }
   });

   swiper.pagination.render();

   swiper.on('resize', function () {
    swiper.slideTo(0, 300, false);
    swiper.pagination.update();
  });


});
