/* IE6 only Scripts - Author: JTP - 24/11/2010 */

$(document).ready(function()
{
	// Add png_bg class to all relevant elements
	//$('#hero-navigation, #hero-navigation a, #links-container .cta figcaption, #links-container .cta span, .more a, .strap').addClass('png_bg');
	$('#hero-navigation, #hero-navigation .first a, #hero-navigation .last a, #links-container .cta figcaption, #links-container .cta span, .more a, .strap').addClass('png_bg');
	
	// Enable country selector dropdown
	$('#country-selector').hover(function(){$(this).addClass('sfhover');},function(){$(this).removeClass('sfhover');});
});