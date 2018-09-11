/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/

/*===========================
 1. function declaretion
 ==========================*/
var themeApp = {
	featuredMedia: function(){
		$(".post").each(function() {
			var thiseliment = $(this);
			var media_wrapper = $(this).find('featured');
			var media_content_image = media_wrapper.find($('img'));
			var media_content_embeded = media_wrapper.find('iframe');
			if (media_content_image.length > 0) {
				$(media_content_image).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-image');
				media_wrapper.remove();
			}
			else if (media_content_embeded.length > 0) {
				$(media_content_embeded).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-embeded');
			}
		});
	},
	sidebarConfig:function() {
		if(sidebar_left == true) {
			$('.main-content').addClass('col-md-push-4');
			$('.sidebar').addClass('col-md-pull-8');
		}
	},
	facebook:function() {
		var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href='+facebook_page_url+'&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
		$('.fb').append(fb_page);
	},
	googlePlus:function() {
		if(badge_type !== "" && google_plus_url !== "") {
			$('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
			var container = $('.google-plus');
			var width = container.width();
			var google_plus_code = '<div class="g-'+badge_type+'" data-width="'+width+'" data-layout="landscape" data-height="150px" data-href="'+google_plus_url+'" data-rel="publisher"></div>';
			container.append(google_plus_code);
		}
	},
	highlighter: function() {
		$('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		  });
	},
	backToTop: function() {
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
    },
    adjustTileHeight: function() {
        var tile = $('.archive .tag-wrapper');
        var max_height = 0;
        if(tile.length > 0) {
            $.each(tile, function(){
                var h = $(this).height();
                max_height = h > max_height ? h : max_height;
            });
            tile.height(max_height);
        }
    },
		mobileNavigation: function() {
			$('nav').on('click', function(event){
				$('.navbar-collapse').toggleClass( "active" );
				console.log('clicked');
			})
		},
	/*kanban: function() {
		  client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
		    document.getElementById('auth-status').innerHTML =
		      `Logged in as anonymous user with id ${user.id}`;
		  });

			client.callFunction("populateCards", "Backlog").then(echoedResult => {
			  console.log(`Echoed result: ${echoedResult}`);
			})

			client.defaultAppClient.callFunction("populateCards", "Backlog").then(
			  function(result) {
			      console.log(result);
			      // prints {"a": "1", "b": false, "c": "hello"}
			  })
		},*/
	init: function() {
		themeApp.featuredMedia();
		themeApp.sidebarConfig();
		themeApp.facebook();
		themeApp.highlighter();
    themeApp.backToTop();
    themeApp.adjustTileHeight();
		themeApp.mobileNavigation();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
  themeApp.init();
});
