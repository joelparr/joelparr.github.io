$(document).ready(
    function() 
    {    	
    	/* 
    		Fancybox
   		*/
        $("a.video-popup").fancybox({
        	'frameWidth':		480,
        	'frameHeight':		385
        });
        
        $("div.flickr_badge_image > img").fancybox();
        
		$("#accordion").accordion({ 
			header: 		'a.expands', 
			active: 		false, 
			collapsible: 	true,
			autoHeight:		false
		});        
    });