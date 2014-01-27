$(function()
{ 
	setInterval(function()
	{
		//$('#container h1').animate({backgroundPosition: '25% -25%'});
		$('#bg2').fadeTo(1000, 0, function()
		{
			//$('#container h1').animate({backgroundPosition: '0 -25%'});
			$('#bg3').fadeTo(1000, 0.8, function()
			{
			
				//$('#container h1').animate({backgroundPosition: '0 25%'});
				$('#bg3').fadeTo(1000, 0, function()
				{
				
					//$('#container h1').animate({backgroundPosition: '-25% 25%'});
					$('#bg4').fadeTo(1000, 0.8, function()
					{
					
						//$('#container h1').animate({backgroundPosition: '-25% 0%'});
						$('#bg4').fadeTo(1000, 0, function()
						{
						
							//$('#container h1').animate({backgroundPosition: '0 25%'});
							$('#bg2').fadeTo(3000, 0.8, function()
							{
								console.log('Beginagain');
							});
						});
					});
				});
			});
		});
	}, 8000);
});
