/* Scripts - Author: JTP - 23/11/2010 */

$(document).ready(function()
{ 
	// Fade borders of product link boxes, action link boxes and mini basket
	$('.link-boxes figure a').fadeBorderColor({fadeInColor: '#ddc143', fadeOutColor: '#574e17', duration: 250});
	$('#actions li').fadeBorderColor({fadeInColor: '#e2e2e2', fadeOutColor: '#767477', duration: 250});
	$('#mini-basket').fadeBorderColor({fadeInColor: '#4a4412', fadeOutColor: '#2e2a2f', duration: 250});	

	// Animate large and small link box, action link box, sidebar nav and read more arrows
	$('.large-panel.link-boxes figure a, .wide .link-boxes figure a').moveBackgroundPosition({childSelector: 'figcaption small', fadeInPosition: '99% 50%', fadeOutPosition: '100% 50%', duration: 100});
	$('.small-panel.link-boxes figure a').moveBackgroundPosition({childSelector: 'figcaption strong', fadeInPosition: '98% 50%', fadeOutPosition: '100% 50%', duration: 100});
	$('#actions li').moveBackgroundPosition({childSelector: 'p a', fadeInPosition: '99% 90%', fadeOutPosition: '100% 90%', duration: 100});
	$('.read-more').moveBackgroundPosition({fadeInPosition: '100% 50%', fadeOutPosition: '99% 50%', duration: 100});
	$('#brand-links a').moveBackgroundPosition({fadeInPosition: '99% 50%', fadeOutPosition: '100% 50%', duration: 100});
	
	// Animate main navigation hover/active indicators, pager hover indicators and pager first/last arrows
	$('#navigation li:not(.active) a, .pager li:not(.current, .first, .last) a').moveBackgroundPosition({fadeInPosition: '0 100%', fadeOutPosition: '0 150%', duration: 125});
	$('.pager .first-page a').moveBackgroundPosition({fadeInPosition: '50% 8px', fadeOutPosition: '100% 8px', duration: 100});
	$('.pager .last-page a').moveBackgroundPosition({fadeInPosition: '50% 8px', fadeOutPosition: '0% 8px', duration: 100});
	
	// Activate link box countdown timers in format "5 Days, 12:11:47"
	$('.large-panel.link-boxes time, .similar .link-boxes time').each(function() { var targetDate = new Date($(this).attr('datetime')); $(this).countdown({until: targetDate, layout: '{d<}{dn} {dl}, {d>}{h<}{hnn}{sep}{h>}{m<}{mnn}{sep}{m>}{s<}{snn}{s>}'}); $(this).fadeIn(50);});
	
	// Activate large countdown timer
	$('#countdown-timer time').activateCountdownTimer();
	
	// Async load the main page BG image
	$('.home #container').asyncLoadBGImage({imagePath: 'images/backgrounds/steel.jpg'});
	$('.haute-horlogerie #container').asyncLoadBGImage({imagePath: 'images/backgrounds/concrete.jpg'});
	$('.omega #container').asyncLoadBGImage({imagePath: 'images/backgrounds/omega.jpg'});
	$('.dkny #container').asyncLoadBGImage({imagePath: 'images/backgrounds/dkny.jpg'});
	$('.hermes #container').asyncLoadBGImage({imagePath: 'images/backgrounds/hermes.jpg'});
	$('.baume #container').asyncLoadBGImage({imagePath: 'images/backgrounds/baume-mercier.jpg'});
	
	// Async load product detail images and activate rollovers
	$('.brand .link-boxes.with-rollovers figure').activateProductRollovers({rolloverImagesSelector: '.alternative-images'});
	
	// Activate tabbed content panels
	$('.tabs').activateTabPanels();
});