/*const jiradb = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('hackers');

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



    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'Backlog', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug']}, priority: { $in: ['Highest', 'High', 'Medium']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'backlog')
      }).catch(err => {
      console.error(err)
    });

    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'To Do', issuetype: { $in: ['Task', 'Story', 'Integration', 'Bug', 'Data', 'Content']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'todo')
      }).catch(err => {
      console.error(err)
    });

    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'In Progress', issuetype: { $in: ['Task', 'Story', 'Integration', 'Bug', 'Content', 'Data']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'progress')
      }).catch(err => {
      console.error(err)
    });

    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(() =>
      jiradb.collection('jira').find({status: 'Done', issuetype: { $in: ['Task', 'Story', 'Integrations', 'Bug']}}, { limit: 6}).asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        populateCards(docs, 'done')
      }).catch(err => {
      console.error(err)
    });

    client.callFunction("numCards", ["Backlog"]).then(result => {
        $('#backlog .count').text(result + ' issues');
    });

    client.callFunction("numCards", ["To Do"]).then(result => {
        $('#todo .count').text(result + ' issues');
    });

    client.callFunction("numCards", ["In Progress"]).then(result => {
        $('#progress .count').text(result + ' issues');
    });

    client.callFunction("numCards", ["Done"]).then(result => {
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
*/
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImthbmJhbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qY29uc3QgamlyYWRiID0gY2xpZW50LmdldFNlcnZpY2VDbGllbnQoc3RpdGNoLlJlbW90ZU1vbmdvQ2xpZW50LmZhY3RvcnksICdtb25nb2RiLWF0bGFzJykuZGIoJ2hhY2tlcnMnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG4gIGZ1bmN0aW9uIHBvcHVsYXRlQ2FyZHMoY2FyZHMsIHN0YXR1cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAkKCcjJyArIHN0YXR1cyArICcgLmNhcmRzJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2FyZFwiPiBcXG4nICtcbiAgICAgICAgICAnPGg1PicgKyBjYXJkc1tpXS5zdW1tYXJ5ICsgJzwvaDU+IFxcbicgK1xuICAgICAgICAgIC8vJzxwPicgKyBjYXJkc1tpXS5kZXNjcmlwdGlvbiArICc8L3A+IFxcbicgK1xuICAgICAgICAgICc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgY2FyZHNbaV0uaXNzdWV0eXBlX2NvbG9yICsgJztcIiBjbGFzcz1cImlzc3VldHlwZSAnICsgY2FyZHNbaV0uaXNzdWV0eXBlICsgJ1wiPjxpbWcgc3JjPVwiJyArIGNhcmRzW2ldLmlzc3VldHlwZV91cmwgKyAnXCI+PC9kaXY+IFxcbicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5mb1wiPiBcXG4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibGVmdFwiPiBcXG4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhdmF0YXJcIj48aW1nIHNyYz1cImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOWViMzg2OGRiNDI4ZmI2MDJlMDNiMzA1OTYwODE5OWI/cz0yNTAmZD1tbSZyPXhcIj48L2Rpdj4gXFxuJyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJpb3JpdHkgJyArIGNhcmRzW2ldLnByaW9yaXR5ICsgJ1wiPjxpIGNsYXNzPVwiZmFzIGZhLWFycm93LXVwXCI+PC9pPjwvZGl2PiBcXG4nICtcbiAgICAgICAgICAgICc8L2Rpdj4gXFxuJyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImVwaWMgJyArIGNhcmRzW2ldLmVwaWNfbmFtZSArICdcIj48c3Bhbj4nICsgY2FyZHNbaV0uZXBpY19uYW1lICsgJzwvc3Bhbj4gPGkgY2xhc3M9XCJmYXMgZmEtYm9sdFwiIHN0eWxlPWNvbG9yOicgKyBjYXJkc1tpXS5lcGljX2NvbG9yICsgJztcIj48L2k+PC9kaXY+IFxcbicgK1xuICAgICAgICAgICc8L2Rpdj4gXFxuJyArXG4gICAgICAgICc8L2Rpdj4nKTtcbiAgICAgIH1cbiAgICAgICQoJyMnICsgc3RhdHVzKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiY291bnRcIj48L3NwYW4+Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgYmFja2xvZ0NvbHVtbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2xvZ1wiKTtcbiAgICBjb25zdCB0b2RvQ29sdW1uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvXCIpO1xuICAgIGNvbnN0IHByb2dyZXNzQ29sdW1uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnByb2dyZXNzXCIpO1xuICAgIGNvbnN0IGRvbmVDb2x1bW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmVcIik7XG5cblxuXG4gICAgY2xpZW50LmF1dGgubG9naW5XaXRoQ3JlZGVudGlhbChuZXcgc3RpdGNoLkFub255bW91c0NyZWRlbnRpYWwoKSkudGhlbigoKSA9PlxuICAgICAgamlyYWRiLmNvbGxlY3Rpb24oJ2ppcmEnKS5maW5kKHtzdGF0dXM6ICdCYWNrbG9nJywgaXNzdWV0eXBlOiB7ICRpbjogWydUYXNrJywgJ1N0b3J5JywgJ0ludGVncmF0aW9ucycsICdCdWcnXX0sIHByaW9yaXR5OiB7ICRpbjogWydIaWdoZXN0JywgJ0hpZ2gnLCAnTWVkaXVtJ119fSwgeyBsaW1pdDogNn0pLmFzQXJyYXkoKVxuICAgICkudGhlbihkb2NzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBkb2NzXCIsIGRvY3MpXG4gICAgICAgIHBvcHVsYXRlQ2FyZHMoZG9jcywgJ2JhY2tsb2cnKVxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIH0pO1xuXG4gICAgY2xpZW50LmF1dGgubG9naW5XaXRoQ3JlZGVudGlhbChuZXcgc3RpdGNoLkFub255bW91c0NyZWRlbnRpYWwoKSkudGhlbigoKSA9PlxuICAgICAgamlyYWRiLmNvbGxlY3Rpb24oJ2ppcmEnKS5maW5kKHtzdGF0dXM6ICdUbyBEbycsIGlzc3VldHlwZTogeyAkaW46IFsnVGFzaycsICdTdG9yeScsICdJbnRlZ3JhdGlvbicsICdCdWcnLCAnRGF0YScsICdDb250ZW50J119fSwgeyBsaW1pdDogNn0pLmFzQXJyYXkoKVxuICAgICkudGhlbihkb2NzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBkb2NzXCIsIGRvY3MpXG4gICAgICAgIHBvcHVsYXRlQ2FyZHMoZG9jcywgJ3RvZG8nKVxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIH0pO1xuXG4gICAgY2xpZW50LmF1dGgubG9naW5XaXRoQ3JlZGVudGlhbChuZXcgc3RpdGNoLkFub255bW91c0NyZWRlbnRpYWwoKSkudGhlbigoKSA9PlxuICAgICAgamlyYWRiLmNvbGxlY3Rpb24oJ2ppcmEnKS5maW5kKHtzdGF0dXM6ICdJbiBQcm9ncmVzcycsIGlzc3VldHlwZTogeyAkaW46IFsnVGFzaycsICdTdG9yeScsICdJbnRlZ3JhdGlvbicsICdCdWcnLCAnQ29udGVudCcsICdEYXRhJ119fSwgeyBsaW1pdDogNn0pLmFzQXJyYXkoKVxuICAgICkudGhlbihkb2NzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBkb2NzXCIsIGRvY3MpXG4gICAgICAgIHBvcHVsYXRlQ2FyZHMoZG9jcywgJ3Byb2dyZXNzJylcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICB9KTtcblxuICAgIGNsaWVudC5hdXRoLmxvZ2luV2l0aENyZWRlbnRpYWwobmV3IHN0aXRjaC5Bbm9ueW1vdXNDcmVkZW50aWFsKCkpLnRoZW4oKCkgPT5cbiAgICAgIGppcmFkYi5jb2xsZWN0aW9uKCdqaXJhJykuZmluZCh7c3RhdHVzOiAnRG9uZScsIGlzc3VldHlwZTogeyAkaW46IFsnVGFzaycsICdTdG9yeScsICdJbnRlZ3JhdGlvbnMnLCAnQnVnJ119fSwgeyBsaW1pdDogNn0pLmFzQXJyYXkoKVxuICAgICkudGhlbihkb2NzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBkb2NzXCIsIGRvY3MpXG4gICAgICAgIHBvcHVsYXRlQ2FyZHMoZG9jcywgJ2RvbmUnKVxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIH0pO1xuXG4gICAgY2xpZW50LmNhbGxGdW5jdGlvbihcIm51bUNhcmRzXCIsIFtcIkJhY2tsb2dcIl0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgJCgnI2JhY2tsb2cgLmNvdW50JykudGV4dChyZXN1bHQgKyAnIGlzc3VlcycpO1xuICAgIH0pO1xuXG4gICAgY2xpZW50LmNhbGxGdW5jdGlvbihcIm51bUNhcmRzXCIsIFtcIlRvIERvXCJdKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICQoJyN0b2RvIC5jb3VudCcpLnRleHQocmVzdWx0ICsgJyBpc3N1ZXMnKTtcbiAgICB9KTtcblxuICAgIGNsaWVudC5jYWxsRnVuY3Rpb24oXCJudW1DYXJkc1wiLCBbXCJJbiBQcm9ncmVzc1wiXSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAkKCcjcHJvZ3Jlc3MgLmNvdW50JykudGV4dChyZXN1bHQgKyAnIGlzc3VlcycpO1xuICAgIH0pO1xuXG4gICAgY2xpZW50LmNhbGxGdW5jdGlvbihcIm51bUNhcmRzXCIsIFtcIkRvbmVcIl0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgJCgnI2RvbmUgLmNvdW50JykudGV4dChyZXN1bHQgKyAnIGlzc3VlcycpO1xuICAgIH0pO1xuXG5cbiAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XG4gICAgICAgaGVpZ2h0OiAxMDAwLFxuICAgICAgIG5vU3dpcGluZzogdHJ1ZSxcbiAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgZ3JhYkN1cnNvcjogZmFsc2UsXG4gICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnYnVsbGV0cycsXG4gICAgICAgIH0sXG4gICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzIDw9IDMyMHB4XG4gICAgICAgIDEwMDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIG5vU3dpcGluZzogZmFsc2UsXG4gICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6ZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgODAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBub1N3aXBpbmc6IGZhbHNlLFxuICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXG4gICAgICAgICAgLy9zbGlkZXNPZmZzZXRCZWZvcmU6IDIwLFxuICAgICAgICAgIC8vc2xpZGVzT2Zmc2V0QWZ0ZXI6IDIwLFxuICAgICAgICB9LFxuICAgICAgICA2MDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgIG5vU3dpcGluZzogZmFsc2UsXG4gICAgICAgICAgc2xpZGVzUGVyQ29sdW1uRmlsbDogJ2NvbHVtbicsXG4gICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAvL3NsaWRlc09mZnNldEJlZm9yZTogMjAsXG4gICAgICAgICAgLy9zbGlkZXNPZmZzZXRBZnRlcjogMjAsXG4gICAgICAgIH0sXG4gICAgICAgIDQwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgbm9Td2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICBzbGlkZXNQZXJDb2x1bW5GaWxsOiAnY29sdW1uJyxcbiAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgICAgICAgIC8vc2xpZGVzT2Zmc2V0QmVmb3JlOiAyMCxcbiAgICAgICAgICAvL3NsaWRlc09mZnNldEFmdGVyOiAyMCxcbiAgICAgICAgfVxuICAgICB9XG4gICB9KTtcblxuICAgc3dpcGVyLnBhZ2luYXRpb24ucmVuZGVyKCk7XG5cbiAgIHN3aXBlci5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgIHN3aXBlci5zbGlkZVRvKDAsIDMwMCwgZmFsc2UpO1xuICAgIHN3aXBlci5wYWdpbmF0aW9uLnVwZGF0ZSgpO1xuICB9KTtcblxuXG59KTtcbiovXG4iXSwiZmlsZSI6ImthbmJhbi5qcyJ9
