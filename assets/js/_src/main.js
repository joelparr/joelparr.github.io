(function() {
	var JP = {
		init: function() {
			this.colorBoxes();
			this.setupMobileMenu();
			this.setupLazyLoad();
			this.setupSmoothScrolling();
		},

		colorBoxes: function() {
			$('.box').map(function() {
				$(this).css('background-color', $(this).attr('data-color-one'));
			});
		},

		setupMobileMenu: function() {
			var $navigation = $('#navigation'),
				$menu 		= $('#menu');

			// SMALL SCREENS: Expanded/collapse the top navigation
			$menu.click(function(e) {
				e.preventDefault();

				var $inner		= $navigation.find('ul'),
					isExpanded	= $navigation.hasClass('expanded');

				if (isExpanded) {
					$menu.removeClass('expanded');
					$navigation.css('height', 0).removeClass('expanded').removeAttr('style');
				} else {
					$navigation.css('height', $inner.height() + 'px').addClass('expanded');
					$menu.addClass('expanded');
				}
			});

			// SMALL SCREENS: Top nav clicks close expanded navigation
			$navigation.find('a').click(function(e) {
				if ($menu.hasClass('expanded'))
					$('#menu').trigger('click');
			});
		},

		// Lazyload setup
		setupLazyLoad: function() {
			var jp = this;

			// 0 threshold, delegate to callback true
			$('.ll').unveil(0, true, function(isRetina) {
		        var $lazyElem	= $(this),
		        	retina 		= isRetina || false,
		        	source 		= $lazyElem.attr('data-src');

		        if (source) {
		        	$('<img />').load(function() {
		        			$lazyElem.attr('src', source).addClass('loaded');
		        	}).attr('src', source);
		        }
			});
		},

		setupSmoothScrolling: function() {
			// http://css-tricks.com/snippets/jquery/smooth-scrolling
			$('a[href*=#]:not([href=#])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && 
					location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html, body').animate({ 
								easing: 'swing',
								scrollTop: target.offset().top 
							}, 500);
							return false;
						}
				}
			});
		}
	};

	$(document).ready(function() {
		JP.init();
	});
}(window));