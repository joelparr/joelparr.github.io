$(function() 
{
	// Launch modal dialog
	$('.launch_modal').click(function() 
	{ 
        $.blockUI
        ({ 
        	message: $('#payment_error'),
        	css: { width: '312px', border: 'none', top: '30%' },
        	overlayCSS: { backgroundColor: '#000', opacity: 0.8 } 
        });
        
		$('#try_again').click(function() 
		{ 
            $.unblockUI(); 
            return false; 
        }); 
        
		$('#close_modal_dialog').click(function() 
		{ 
            $.unblockUI(); 
            return false; 
        }); 
    }); 
    
    $('a#close_message_box').click(function()
    {
    	$(this).parent().fadeTo('fast', 0, function()
    	{
    		$(this).slideUp('slow', function() 
    		{
    			$(this).remove();
    		});
    	});
    });
});