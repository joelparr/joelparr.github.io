$(function() 
{
	//Form field default val
    $("input.toggle-blank").focus(function()
    {
    	if (this.value == "Search") { this.value = ""; }
    });
	$("input.toggle-blank").blur(function()
    {
    	if (this.value == "") { this.value = "Search"; }
    });
    
	$("#accordion").accordion({ 
		header: 		'h2.expands', 
		active: 		0, 
		collapsible: 	true,
		autoHeight:		false
	});
	
	$("#accordion-shut").accordion({ 
		header: 		'h2.expands', 
		active: 		false, 
		collapsible: 	true,
		autoHeight:		false
	});
	
	$("#faq").accordion({ 
		header: 		'h3', 
		active: 		false, 
		collapsible: 	true,
		autoHeight:		false
	});
	
	$("a[rel='single']").colorbox();
	$("a[rel='gallery']").colorbox({current: '{current} of {total}'});
	$("a.colorbox").colorbox();
	
	$("body.potm div#navigation-side ul#navigation-side-menu li a").hover(function()
	{
		var s1 = $("span:first", this).text();
		var s2 = $("span:last", this).text();
		$("span:first", this).text(s2);
		$("span:last", this).text(s1);
	}, function()
	{
		var s1 = $("span:first", this).text();
		var s2 = $("span:last", this).text();
		$("span:first", this).text(s2);
		$("span:last", this).text(s1);		
	});
});