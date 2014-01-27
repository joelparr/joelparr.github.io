$(function() 
{
	//Form field default val
    $("input.toggle-blank").focus(function()
    {
    	if (this.value == "Search for an answer...") { this.value = ""; }
    });
	$("input.toggle-blank").blur(function()
    {
    	if (this.value == "") { this.value = "Search for an answer..."; }
    });
	
	$("a[rel='single']").colorbox();
	$("a[rel='gallery']").colorbox({current: '{current} of {total}'});
	$("a.colorbox").colorbox();
	
	$(".inlineEmbeddedLink").each(function(i)
	{ 
		$(this).simpletip(
		{
			position: 'right',
			offset: [-30, -95],
			content: arr_tooltips[i]
		});
	}); 
});