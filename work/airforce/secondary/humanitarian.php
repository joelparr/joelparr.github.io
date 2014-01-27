<?php
error_reporting(E_ALL);
require_once('include/simplepie.inc.php');

$newsFeed = new SimplePie(); // Feed consuming object
$newsFeed->set_feed_url('http://www.af.mil/rss/TopStoriesByCategory.asp?catId=3'); // The feed
$newsFeed->enable_cache(false); // $$$ Enable caching when live
$newsFeed->init(); // Start consume
$newsFeed->handle_content_type(); // Ensure text/html & UTF-8
?>
<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
       Remove this if you use the .htaccess -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>About the Air Force: Humanitarian Missions</title>
  <meta name="description" content="Lorem ipsum dolor sit amet.">
  <meta name="keywords" content="Air Force, USAF, United States, military, humanitarian, air deliveries, CCAT, ECMO, Communications, Goodwill, Fire Response, Rescue, Rescue3D, movie">

  <!-- Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Place favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- CSS: implied media="all" -->
  <link rel="stylesheet" href="css/style.css?v=3">

  <!-- Uncomment if you are specifically targeting less enabled mobile browsers
  <link rel="stylesheet" media="handheld" href="css/handheld.css?v=2">  -->

  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <script src="js/libs/modernizr-1.7.min.js"></script>

	<script>var secondaryPageOptions = { mode: 'human' };</script>
</head>

<body>
    <div class="secondary generic" id="container">
		<div id="vidOverlay"></div>
        <div id="headerImg">
        	<div id="headerTxt">
                <h1>Providing Help However We Can</h1>
                <p>The Air Force doesn't just use its resources to serve the military mission - but to also serve mankind. 
                In any kind of humanitarian crisis, we perform a variety of missions to aid those in need. 
                Explore some of the many ways we use our resources to serve others.</p>
            </div>
        	<img src="img/human_header.jpg" />
        </div>
		<div id="videoThumbHeader">
        	<a class="arrowNav" href="javascript:void(0);">Scroll to Videos</a><h2>Humanitarian Missions</h2>
        </div>
        <div id="videoThumbContainer"></div>
        <footer id="footerContent">
			<article class="doublePanel textPanel newsHeadlines">
				<h3>Latest Headlines</h3>
				<ul class="newsStories">
					<?php foreach ($newsFeed->get_items() as $item): ?>
						<li>
							<?php echo $item->content(); ?>
							<h5><?php echo $item->get_title(); ?></h5>
							<p class="newsDate"><?php echo $item->get_date('m/d/Y'); ?></p>
							<a href="<?php echo $item->get_permalink(); ?>" title="<?php echo $item->get_title(); ?>">Read More</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</article>
        </footer>
    </div> <!--! end of #container -->

	<img height="1" width="1" src="http://view.atdmt.com/action/astbrl_LandingPage_1"/>
    <!-- JavaScript at the bottom for fast page loading -->
    
    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
    <script>window.jQuery || document.write('<script src="js/libs/jquery-1.5.1.min.js">\x3C/script>')</script>

	<script src="js/jquery-ui.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.address-1.4.min.js?strict=false"></script>
    <script src="js/jquery.easing.1.3.js" type="text/javascript"></script>
    <script src="js/jquery.swfobject.1-1-1.min.js" type="text/javascript"></script>
    <!--<script src="js/easySlider1.7.js" type="text/javascript"></script> -->
    <script src="js/video.js" type="text/javascript" charset="utf-8"></script>
    
    <!-- scripts concatenated and minified via ant build script-->
    <script src="js/cufon-yui.js" type="text/javascript"></script> 
    <script src="js/font.js" type="text/javascript"></script> 
	<script type="text/javascript"> Cufon.now(); </script>
    
    <script src="js/script.js"></script>
    <!-- end scripts-->

  <!--[if lt IE 7 ]>
    <script src="js/libs/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix('img, .png_bg'); // Fix any <img> or .png_bg bg-images. Also, please read goo.gl/mZiyb </script>
  <![endif]-->
  <script>
	  Cufon.now();
  </script>
  
  <!-- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID -->
  <script>
    var _gaq=[['_setAccount','UA-4669840-16'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>

</body>
</html>