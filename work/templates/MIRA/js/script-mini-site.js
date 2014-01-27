/* Scripts - Author: JTP - 23/11/2010 */

$(document).ready(function()
{ 	
	// Enable hero cycling and hook up navigation links
	$('#hero figure:first').fadeIn(600, function(){ 
		$('#hero').cycle({
			delay: 1000, speed: 1000, timeout: 5000, pause: true, 
		    cleartype:  false, cleartypeNoBg: false,
			before: onBefore, 
			after: onAfter
		}); 
		
		// Attach click handler to each navigation option to update hero cycling
		$('#hero-navigation li:not(.first, .last) a').each(function(i){
			$(this).click(function(){
				$('#hero').cycle(i);
				if (!$(this).parent().hasClass('active')){
					$('#hero-navigation .active a').stop().animate({backgroundPosition: '50% 55px'}, 300);
					$('#hero-navigation .active').removeClass('active');
					$(this).parent().addClass('active');
				}
				return false;
			});
		});
		
		// Attach click handler to move between navigation pages
		var menuState = 0;
		$('#hero-navigation .last a, #hero-navigation .first a').click(function(){
			if (menuState == 0){
				$('#hero-navigation li:lt(5)').not('.first').hide();
				$('#hero-navigation li:gt(4)').not('.last').show();
				$('#hero').cycle(4);
				menuState = 1;
			} else {
				$('#hero-navigation li:gt(4)').not('.last').hide();				
				$('#hero-navigation li:lt(5)').not('.first').show();
				$('#hero').cycle(0);
				menuState = 0;
			}
			return false;			
		});	
		
		// Callback methods for before/after hero cycles
		function onBefore(curr, next, opts){
			$('#hero-navigation .active a').stop().animate({backgroundPosition: '50% 55px'}, 300); 
			$('#hero-navigation .active').removeClass('active');
		}
		function onAfter(curr, next, opts){ 
			if ((opts.currSlide == 4 && menuState == 0) || (opts.currSlide == 0 && menuState == 1)){
				$('#hero-navigation .last a').trigger('click'); 
			}
			$('#hero-navigation #show-' + this.id).parent().addClass('active'); 
			$('#hero-navigation .active a').stop().animate({backgroundPosition: '50% 0'}, 200);
		}
	});
	
	// Enable tabs
	$('.tabs').activateTabPanels();
	
	// Enable expand/contract panels
	$('.expand-contract .tab').each(function(){
		$(this).find('li:first').addClass('active').find('div').show();
	});
	$('.expand-contract .tab h2 a').click(function() {
		$(this).parent().next().slideToggle(400, function(){
			($(this).parent().hasClass('active')) ? $(this).parent().removeClass('active'): $(this).parent().addClass('active');
		});
		return false;
	});
	
	// Fade borders
	$('.rolldown-trigger').fadeBorderColor({fadeInColor: '#fefefe', fadeOutColor: '#01a4a6', duration: 250});
	$('#rolldown-navigation li').fadeBorderColor({childSelector: 'a img', fadeInColor: '#01a4a6', fadeOutColor: '#b1b3b4', duration: 250});
	$('.cta a').fadeBorderColor({fadeInColor: '#01a4a6', fadeOutColor: '#b1b3b4', duration: 250});
	$('.cta-expanded a').fadeBorderColor({childSelector: 'span', fadeInColor: '#01a4a6', fadeOutColor: '#b1b3b4', duration: 250});

	// Animate arrows
	$('.cta a').moveBackgroundPosition({childSelector: 'span', fadeInPosition: '99% 97%', fadeOutPosition: '100% 97%', duration: 100});
	$('.rolldown-trigger').moveBackgroundPosition({childSelector: 'a', fadeInPosition: '0 75%', fadeOutPosition: '0 60%', duration: 100});
	$('#hero-navigation .first').moveBackgroundPosition({childSelector: 'a', fadeInPosition: '45% 50%', fadeOutPosition: '50% 50%', duration: 100});
	$('#hero-navigation .last').moveBackgroundPosition({childSelector: 'a', fadeInPosition: '57% 50%', fadeOutPosition: '50% 50%', duration: 100});
	
	// Animate padding (rise up/down/left/right effect)
	$('.cta-expanded a').not('.vertical a').addPadding({childSelector: 'span time, span b', boxSide: 'bottom', moveInPadding: '6px', moveOutPadding: '3px', duration: 100});
});