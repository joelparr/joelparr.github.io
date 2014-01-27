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
        
		$("#accordion").accordion({ 
			header: 		'a.expands', 
			active: 		false, 
			collapsible: 	true,
			autoHeight:		false
		});        
    });