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
    });