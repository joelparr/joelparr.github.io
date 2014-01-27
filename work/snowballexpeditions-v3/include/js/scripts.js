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
		$(function(){
		    $('a[rel=external]').click(function(e){
		        open(this.href);
		        e.preventDefault();
		    });
		}); 
          
        $.fn.cycle.defaults.speed   = 1500;
        $.fn.cycle.defaults.timeout = 3500;
        $('#photobox-pics').cycle({
            fx:     'fade',
            random: 1
        });
    });