/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/

// import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

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
		resizeIframe: function(iframe) {
	    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
	  },
	stitchLogin: function() {
		stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(
			Stitch.defaultAppClient.callFunction("AuthorTitle", "todd").then(result => {
					console.log(result);
					$('.title > span').text(result);
				})
			);
				/*const stitchClient = Stitch.initializeDefaultAppClient("hackers-uangn");

		$('#account').on('click', function(event) {
			event.preventDefault();
			return false;
		});

		$('.dropdown-menu .btn').on('click', function(event) {
			event.preventDefault();
			return false;
		});

		// Authenticate an application user based on the submitted information
		async function handleLogin() {
			const email = loginEmailEl.value;
			const password = loginPasswordEl.value;
			const credential = new UserPasswordCredential(email, password);

			try {
				await stitchClient.auth.loginWithCredential(credential);
				const user = stitchClient.auth.user;
				showLoggedInState();
				displaySuccess(`Logged in as: ${user.profile.data.email}`)

			} catch (e) {
				handleError(e)
			}
		}*/
	},
	tags: function() {
		var tags = {
	    nodejs: '<i class="fab fa-node-js"></i>',
	    aws: '<i class="fab fa-aws"></i>',
	    python: '<i class="fab fa-python"></i>',
	    django: '<i class="fab fa-python"></i>',
	    nosql: '<i class="fab fa-envira"></i>',
	    apis: '<i class="fab fa-hubspot"></i>',
	    frontend: '<i class="far fa-code"></i>',
	    data: '<i class="fas fa-chart-pie"></i>',
	    mysql: '<i class="fas fa-database"></i>',
	    javascript: '<i class="fab fa-js-square"></i>',
	    roundup: '<i class="fas fa-undo-alt"></i>',
	    excel: '<i class="fal fa-table"></i>',
	    devops: '<i class="fas fa-server"></i>',
	    pandas: '<i class="fas fa-database"></i>',
	    datascience: '<i class="fas fa-flask"></i>',
	    tableau: '<i class="far fa-asterisk"></i>',
	    googlecloud: '<i class="fab fa-google"></i>',
	    sql: '<i class="fas fa-database"></i>',
	    statistics: '<i class="far fa-chart-bar"></i>',
	    flask: '<i class="fab fa-affiliatetheme"></i>',
	    expressjs: '<i class="fab fa-etsy"></i>',
	    atlassian: '<i class="fab fa-trello"></i>',
	    codesnippetcorner: '<i class="fal fa-laptop-code"></i>'
	  };

	  for (var key in tags) {
	    $('.' + key).find('i').replaceWith( tags[key] );
	  }
	},
	init: function() {
		themeApp.featuredMedia();
		themeApp.sidebarConfig();
		themeApp.facebook();
		themeApp.highlighter();
    themeApp.backToTop();
    themeApp.adjustTileHeight();
		themeApp.mobileNavigation();
		themeApp.stitchLogin();
		themeApp.tags();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
  themeApp.init();
});
