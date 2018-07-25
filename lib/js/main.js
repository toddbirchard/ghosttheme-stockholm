'use strict';

var _mongodbStitchBrowserSdk = require('mongodb-stitch-browser-sdk');

var client = _mongodbStitchBrowserSdk.Stitch.initializeDefaultAppClient('hackerjira-bzmfe');

/*===========================
 1. function declaretion
 ==========================*/
/*====================================================
  TABLE OF CONTENTS
  1. function declaretion
  2. Initialization
====================================================*/
var themeApp = {
	featuredMedia: function featuredMedia() {
		$(".post").each(function () {
			var thiseliment = $(this);
			var media_wrapper = $(this).find('featured');
			var media_content_image = media_wrapper.find($('img'));
			var media_content_embeded = media_wrapper.find('iframe');
			if (media_content_image.length > 0) {
				$(media_content_image).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-image');
				media_wrapper.remove();
			} else if (media_content_embeded.length > 0) {
				$(media_content_embeded).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-embeded');
			}
		});
	},
	sidebarConfig: function sidebarConfig() {
		if (sidebar_left == true) {
			$('.main-content').addClass('col-md-push-4');
			$('.sidebar').addClass('col-md-pull-8');
		}
	},
	facebook: function facebook() {
		var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href=' + facebook_page_url + '&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
		$('.fb').append(fb_page);
	},
	googlePlus: function googlePlus() {
		if (badge_type !== "" && google_plus_url !== "") {
			$('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
			var container = $('.google-plus');
			var width = container.width();
			var google_plus_code = '<div class="g-' + badge_type + '" data-width="' + width + '" data-layout="landscape" data-height="150px" data-href="' + google_plus_url + '" data-rel="publisher"></div>';
			container.append(google_plus_code);
		}
	},
	mailchimp: function mailchimp() {
		var form = $('#mc-embedded-subscribe-form');
		form.attr("action", mailchimp_form_url);
		var message = $('#message');
		var submit_button = $('mc-embedded-subscribe');
		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
		form.submit(function (e) {
			e.preventDefault();
			$('#mc-embedded-subscribe').attr('disabled', 'disabled');
			if ($('#mce-EMAIL').val() != '' && IsEmail($('#mce-EMAIL').val())) {
				message.html('please wait...').fadeIn(1000);
				var url = form.attr('action');
				if (url == '' || url == 'YOUR_MAILCHIMP_WEB_FORM_URL_HERE') {
					alert('Please config your mailchimp form url for this widget');
					return false;
				} else {
					url = url.replace('?u=', '/post-json?u=').concat('&c=?');
					console.log(url);
					var data = {};
					var dataArray = form.serializeArray();
					$.each(dataArray, function (index, item) {
						data[item.name] = item.value;
					});
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						success: function success(response, text) {
							if (response.result === 'success') {
								message.html(success_message).delay(10000).fadeOut(500);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').val('');
							} else {
								message.html(response.result).delay(10000).fadeOut(500);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').focus().select();
							}
						},
						dataType: 'jsonp',
						error: function error(response, text) {
							console.log('mailchimp ajax submit error: ' + text);
							$('#mc-embedded-subscribe').removeAttr('disabled');
							$('#mce-EMAIL').focus().select();
						}
					});
					return false;
				}
			} else {
				message.html('Please provide valid email').fadeIn(1000);
				$('#mc-embedded-subscribe').removeAttr('disabled');
				$('#mce-EMAIL').focus().select();
			}
		});
	},
	highlighter: function highlighter() {
		$('pre code').each(function (i, block) {
			hljs.highlightBlock(block);
		});
	},
	backToTop: function backToTop() {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 1000);
			return false;
		});
	},
	adjustTileHeight: function adjustTileHeight() {
		var tile = $('.archive .tag-wrapper');
		var max_height = 0;
		if (tile.length > 0) {
			$.each(tile, function () {
				var h = $(this).height();
				max_height = h > max_height ? h : max_height;
			});
			tile.height(max_height);
		}
	},
	mobileNavigation: function mobileNavigation() {
		$('nav').on('click', function (event) {
			$('.navbar-collapse').toggleClass("active");
			console.log('clicked');
		});
	},
	kanban: function kanban() {
		client.auth.loginWithCredential(new _mongodbStitchBrowserSdk.AnonymousCredential()).then(function (user) {
			document.getElementById('auth-status').innerHTML = 'Logged in as anonymous user with id ' + user.id;
		});

		client.callFunction("populateCards", "Backlog").then(function (echoedResult) {
			console.log('Echoed result: ' + echoedResult);
		});

		client.defaultAppClient.callFunction("populateCards", "Backlog").then(function (result) {
			console.log(result);
			// prints {"a": "1", "b": false, "c": "hello"}
		});
	},
	init: function init() {
		themeApp.featuredMedia();
		themeApp.sidebarConfig();
		themeApp.facebook();
		themeApp.highlighter();
		themeApp.mailchimp();
		themeApp.backToTop();
		themeApp.adjustTileHeight();
		themeApp.mobileNavigation();
		themeApp.kanban();
	}

	/*===========================
 2. Initialization
 ==========================*/
};$(document).ready(function () {
	themeApp.init();
});