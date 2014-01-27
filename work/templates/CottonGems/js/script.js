/* Scripts - JTP - 19/04/2011 */

$(document).ready(function(){
	// Hide and then enable the Dropdown Mini Basket */
	var basketMinimisedHeight = 5; var basketHeight = $('#quickBasketContents').height();

	// Set the contents height to 0, set it to visible, then animate it up to minimised height
	$('#quickBasketContents').height(0).show().animate({height: basketMinimisedHeight + 'px'}, 'fast');

	// Show/hide Dropdown Mini Basket	
    $('#quickBasketButton a').toggle(function(){ 
    		$('#quickBasketContents').animate({height: (basketHeight + 20) + 'px'}).animate({height: basketHeight + 'px'}, 'fast'); 
    		$(this).parent().addClass('hide'); return false;
    	}, function(){ 
    	$('#quickBasketContents').animate({height: (basketMinimisedHeight - 3) + 'px'}).animate({height: basketMinimisedHeight + 'px'}, 'fast');
    		$(this).parent().removeClass('hide'); return false;
    	}
    );
    
	// Kick off hero cycling
	$('#hero #slides').cycle({
		delay: 1000, speed: 1000, timeout: 5000, pause: 1, 
		cleartype:  false, cleartypeNoBg: false,
		before: onBefore, 
		after: onAfter
	}); 
	
	// Attach click handler to each navigation option to update hero cycling
	$('#heroNavigation a').each(function(i){
		$(this).click(function(){
			if (!$(this).parent().hasClass('active')){
				$('#heroNavigation .active').removeClass('active');
				$(this).parent().addClass('active');
			}
			$('#hero #slides').cycle(i); return false;
		});
	});
	
	// Callback methods for before/after hero cycles
	function onBefore(curr, next, opts){ $('#heroNavigation .active').removeClass('active'); }
	function onAfter(curr, next, opts){ $('#heroNavigation #show-' + this.id).parent().addClass('active'); }
	
	// Enable expand/contract lists
	$('.expand-contract a').click(function() {
		$(this).parent().next().slideToggle(400, function(){
			($(this).prev().hasClass('collapsed')) ? $(this).prev().removeClass('collapsed'): $(this).prev().addClass('collapsed');
		});
		return false;
	}); 
});
