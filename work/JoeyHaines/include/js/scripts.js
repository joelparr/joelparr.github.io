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

        // Sets up the carousel for photos
        $('#carousel').jcarousel(
            {
                size: mycarousel_itemList.length,
                itemLoadCallback: {onBeforeAnimation: mycarousel_itemLoadCallback}
            }
        );    
    });
    
    
     // Set thickbox loading image
    tb_pathToImage = "images/loading-thickbox.gif";

    var mycarousel_itemList = [
        {url: "Bathroom-01.jpg", title: "Bathroom Tiling and Fitting"},
        {url: "Bathroom-02.jpg", title: "Bathroom Tiling and Fitting"},
        {url: "Bathroom-03.jpg", title: "Bathroom Tiling and Fitting"},
        {url: "Bathroom-04.jpg", title: "Bathroom Tiling and Fitting"},
        {url: "Bathroom-05.jpg", title: "Bathroom Tiling and Fitting"},
        {url: "Bathroom-06.jpg", title: "Bathroom Tiling and Fitting"},
        {url: "Exterior-01.jpg", title: "Exterior Work"},
        {url: "Exterior-02.jpg", title: "Exterior Work"},
        {url: "Exterior-03.jpg", title: "Exterior Work"},
        {url: "Exterior-04.jpg", title: "Exterior Work"},
        {url: "Interior-01.jpg", title: "Interior Work"},
        {url: "Interior-02.jpg", title: "Interior Work"},
        {url: "Interior-03.jpg", title: "Interior Work"},
        {url: "Interior-04.jpg", title: "Interior Work"}
    ];

    function mycarousel_itemLoadCallback(carousel, state)
    {
        for (var i = carousel.first; i <= carousel.last; i++) {
            if (carousel.has(i)) {
                continue;
            }

            if (i > mycarousel_itemList.length) {
                break;
            }

            // Create an object from HTML
            var item = jQuery(mycarousel_getItemHTML(mycarousel_itemList[i-1])).get(0);

            // Apply thickbox
            tb_init(item);

            carousel.add(i, item);
        }
    };
        
        /**
     * Item html creation helper.
     */
    function mycarousel_getItemHTML(item)
    {
        return '<a href="images/photos/' + item.url + '" title="' + item.title + '"><img src="images/photos/' + item.url + '" height="75" width="75" border="0" alt="' + item.title + '" /></a>';
    };