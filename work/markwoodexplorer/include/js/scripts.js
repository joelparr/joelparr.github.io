$(document).ready(
    function() 
    {    	
        // fixes IE6 image flickr problem. See:
        // http://www.mister-pixel.com
        try 
        {
            document.execCommand("BackgroundImageCache", false, true);
        } 
        catch(e) {}
        
        // Opens all external links in new windows        
        $("a[@rel~='external']").click(
            function()
            {
                window.open($(this).attr("href"));
                return false;
            });
            
        $.fn.cycle.defaults.speed   = 1500;
        $.fn.cycle.defaults.timeout = 3500;
        $('#photobox-pics').cycle({
            fx: 'fade',
            random: 1,
            next: '#next-photo-button'
        });
        
		$(function () 
		{
			$('.has-submenu').each(function () {
				var distance = 10;
				var time = 250;
				var hideDelay = 500;
	
				var hideDelayTimer = null;
	
				var beingShown = false;
				var shown = false;
				var trigger = $('.show-submenu', this);
				var info = $('.submenu', this).css('opacity', 0);
	
	
				$([trigger.get(0), info.get(0)]).mouseover(function () {
					if (hideDelayTimer) clearTimeout(hideDelayTimer);
					if (beingShown || shown) {
						// don't trigger the animation again
						return;
					} else {
						// reset position of info box
						beingShown = true;
	
						info.css({
							top: 13,
							left: -7,
							display: 'block'
						}).animate({
							top: '+=' + distance + 'px',
							opacity: 1
						}, time, 'swing', function() {
							beingShown = false;
							shown = true;
						});
					}
	
					return false;
				}).mouseout(function () {
					if (hideDelayTimer) clearTimeout(hideDelayTimer);
					hideDelayTimer = setTimeout(function () {
						hideDelayTimer = null;
						info.animate({
							top: '-=' + distance + 'px',
							opacity: 0
						}, time, 'swing', function () {
							shown = false;
							info.css('display', 'none');
						});
	
					}, hideDelay);
	
					return false;
				});
			});
		});
    });