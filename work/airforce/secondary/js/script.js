/* Author: Coloring Book Studio (SAS)
*/

/* CONOSOLE*/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};

(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

var SecondaryPage = {
	init: function() {
		var basePath = '/work/airforce/secondary/';
		var newsFeed = 'http://www.af.mil/rss/TopStoriesByCategory.asp?catId=3';
		var pageTitle = document.title;
		document.title = pageTitle + ' - airforce.com';
		
		/************TRANSITION FUNCTIONS****************/
		function closeOverlay() {
			 $('#vidOverlay').fadeOut(300, function() {
				 $('#vidOverlay').html('&nbsp;');
			 });
			//$('#vidOverlay').css('display','none');
		}
		
		function openOverlay(overHTML, vidPath, ImgPath) {
			$('#vidOverlay').html(overHTML).focus();
			addVideo('vidHolder',vidPath,ImgPath,'','true',864,486);
			Cufon.refresh();
			 $('#vidOverlay').fadeIn(300, function() {
				$('li.current-section').hide(); /*To hide the current nav*/
				/*$(this).click(function(e) {
					if(jQuery.browser.msie){
						if(event.srcElement.nodeName != 'OBJECT') { 
						$.address.value('/home'); 
						e.preventDefault();
						}
					} else {
						if(event.target.nodeName != 'OBJECT') { 
						$.address.value('/home'); 
						$('li.current-section').show(); /*to show the current nav*/	/*
						e.preventDefault();
						}
					}
				});*/
				 
				$('#overlayContent .closeButton').each(function() {
					$(this).click(function(e) {  
						$.address.value('/home'); 
						$('li.current-section').show(); /*to show the current nav*/
						e.preventDefault();
					});
				});
				$("#vidOverlay").keypress(function(e) {
					var  enterCheck = $(this);
					var code =null;
					code= (e.keyCode ? e.keyCode : e.which);
					if (code == 27) {
						$.address.value('/home'); 
						$(this).unbind('keypress');
						e.preventDefault();
					}
				});		 
			
			 });
			onResize();
			//$('#vidOverlay').css('display','block');
		}
		
		function animatedRolloverOn() {
			//console.log("animatedRolloverOn");
		
			$('.videoThumb').each(function() {
				$(this).mouseover(function () {
					var targetOverlay = $(this).children('.videoCTA');
					var overOffset = 280 - targetOverlay.height();
		
					//console.log("ROLLED OVER: "+overOffset);
		
					$(this).children('.videoCTA').animate({ top:overOffset },{ queue:false, duration:300}, function() {$(this).css('top',overOffset)});
					}).mouseout(
					function () {
					$(this).children('.videoCTA').animate({ top:235 },{ queue:false, duration:300}, function() {$(this).css('top',235)});
		
				});
			});
		}
		
		function animatedRolloverOff(targetDIV) {
			$("#"+targetDIV).unbind('mouseenter mouseleave mouseout mouseover');
			$("#"+targetDIV).unbind('mouseenter mouseleave mouseout mouseover');
		//	$('#puppetNav').css('display','none');
		}
		
		/*******************MEDIA HANDLER*******************/
		
		function addVideo(targetDIV,sourceVid,sourceImg,sourceLink,autoFlag,holderWidth,holderHeight) {
			if ($.flash.available) {
				if(jQuery.browser.msie){
					//Cufon.refresh();
					var flashVideoContent = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+holderWidth+'" height="'+holderHeight+'" id="videoHolder_1" align="middle"><param name="movie" value="'+basePath+'swfs/videoPlayer.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="transparent" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowscriptaccess" value="always" /><param name="allowFullScreen" value="true" /><param name=FlashVars value="vidPath='+sourceVid+'&posterPath='+sourceImg+'&autoPlayFlag='+autoFlag+'"><a href="http://www.adobe.com/go/getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></object>';
					$("#"+targetDIV).html(flashVideoContent);
				} else {
					
					$("#"+targetDIV).flash({
						swf:basePath + 'swfs/videoPlayer.swf',
						width: holderWidth,
						height: holderHeight,
						allowFullScreen: true,
						wmode: 'transparent',
						allowscriptaccess:'always',
						quality:'high',
						swLiveConnect:true,
						encodeParams: false,
						flashvars: {
							vidPath:sourceVid,
							posterPath:sourceImg,
							autoPlayFlag:autoFlag
						}
					});	
				}
				
			} else {
				VideoJS.setupAllWhenReady();
				$("video").VideoJS();
				var videoElement = '<div class="video-js-box"><video id="videoHolder_1" class="video-js" width="'+holderWidth+'" height="'+holderHeight+'" controls="controls" preload="auto" poster="'+sourceImg+'"><source src="'+sourceVid+'" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' /><img src="'+sourceImg+'" width="'+holderWidth+'" height="'+holderHeight+'" alt="Poster Image" title="No video playback capabilities." /></object></video><p class="vjs-no-video"><strong>Download Video:</strong><a href="'+sourceImg+'">MP4</a></p></div>"';
				$("#"+targetDIV).html(videoElement)
				if (autoFlag == "true") {
					$("#"+targetDIV)[0].player.play();
				}
		
			}
		}
		
		function addFlash(targetDIV,sourceSWF,holderWidth,holderHeight) {
			if ($.flash.available) {
				//console.log('$.flash.available');
				$("#"+targetDIV).flash({
					swf:sourceSWF,
					width: holderWidth,
					height: holderHeight,
					allowFullScreen: true,
					allowscriptaccess: 'always',
					wmode: 'transparent',
					allowScriptAccess:'sameDomain',
					quality:'high',
					swLiveConnect:true
				});	
			}
			
		}
		
		/*******************EVENT HANDLERS*******************/
		var currentOverlayHTML;
		var currentOverlayVideo, currentOverlayPoster;
		
		function onChange(event) {
		//	event.preventDefault();
			var value = event.value;
			var addressArray =value.split('/');
			var newSection,newURL,urlOffset;
			var sectionName = "Welcome";
			//console.log("URL CHANGED "+addressArray[1]);
		
			newSection = addressArray[1];
			if (newSection != undefined) {
				if (newSection == 'home') {
					$.address.title(pageTitle + ' - airforce.com');
					closeOverlay();
				} else {
					for (var i = 0;i<overlayRefArray.length;i++) {
						var compPath = overlayRefArray[i][0];

						if (newSection == compPath) {
							$.address.title(pageTitle + overlayRefArray[i][1] + ' - airforce.com');
							currentOverlayHTML = overlayRefArray[i][2];
							currentOverlayVideo = overlayRefArray[i][3];
							currentOverlayPoster = overlayRefArray[i][4];
							openOverlay(currentOverlayHTML,currentOverlayVideo,currentOverlayPoster);
							break;
						} else {
							//	
						}
					}
				}
				
			} else {
				$.address.title(pageTitle + ' - airforce.com');
				closeOverlay();
			}
		}
		
		
		/*******************XML HANDLER*******************/
		var overlayRefArray = new Array;
		
		// AIRMAN THUMBNAILS HANDLER
		function parseAirmanThumbs(xmlData) 
		{
			var videoThumbArray = new Array;
			$(xmlData).find("entry").each(function() {
				var airmanName = $(this).find("name").text();
				//var airmanCaption = $(this).find("caption").text();
				var str = $(this).find("background").text();
				var firstSpace = str.indexOf(" ", 84);
				var airmanCaption = str.substring(0,firstSpace)+"...";
				
				var airmanPath = $(this).find("pagePath").text();
				var airmanImg = $(this).find("imgPath").text();
				var airmanVid = $(this).find("vidPath").text();
				var airmanPoster = $(this).find("posterPath").text();
				var airmanHometown = $(this).find("hometown").text();
				var airmanCurrentDuty = $(this).find("currentDuty").text();
				var airmanJobTitle = $(this).find("jobTitle").text();
				var airmanJobDescription = $(this).find("jobDescription").text();
				var airmanCareerHighlights = $(this).find("careerHighlights").text();
				var airmanBackground = $(this).find("background").text();
				var trackingURL = $(this).find("trackingURL").text();
					
				var airmanOverlay = new Array;	
				var overlayHTML = generateAirmanOverlayHTML(airmanImg, airmanName, airmanHometown, airmanCurrentDuty, 
					airmanJobTitle, airmanJobDescription, airmanCareerHighlights, airmanBackground, trackingURL);
				
				airmanOverlay[0] = airmanPath;
				airmanOverlay[1] = airmanName;
				airmanOverlay[2] = overlayHTML;
				airmanOverlay[3] = airmanVid;
				airmanOverlay[4] = airmanPoster;
				overlayRefArray.push(airmanOverlay);
				
				var entryHTML = generateThumb(airmanName, airmanCaption, airmanPath, airmanImg);
				videoThumbArray.push(entryHTML);
			});
		
			var contactHTML = generateContactPanel();
			
			videoThumbArray.push(contactHTML);
			//videoThumbArray.sort(randOrd);
			if ($('#videoThumbContainer')) $('#videoThumbContainer').html(videoThumbArray.join(''));
			
			animatedRolloverOn();
			finishPageLoad();
		}
		
		// GENERIC THUMBNAILS HANDLER
		function parseThumbs(xmlData) 
		{
			var thumbArray = new Array;
			$(xmlData).find("entry").each(function() {
				var mode = $(this).attr('mode');
			
				var title = $(this).find("title").text();
				var lede = $(this).find("lede").text();
				var trackingURL = $(this).find("trackingURL").text();
				
				var path = $(this).find("pagePath").text();
				var thumbImg = $(this).find("imgPath").text();
				var poster = $(this).find("posterPath").text();
				var copy = $(this).find("copy").text();

				var vid = $(this).find("vidPath").text();
				
				var count = 0;
				var galleryThumbnailHTML = '<ul class="galleryThumbs">';
				$(this).find("galleryThumbnail").each(function()
				{
					var selClass = '';
					if (count == 0)
						selClass = ' class="selected"';
				
					var thumbType = $(this).attr('type');
					var thumbCaption =  $(this).find('caption').text();
					var thumbLinkTooltip =  $(this).find('tooltip').text();
					var thumbLinkElem = $(this).find('link');
					var thumbLink = thumbLinkElem.text();
					var thumbLinkTitle = thumbLinkElem.attr('tooltip');
					var thumbImgElem = $(this).find('img');
					var thumbImgAlt = thumbImgElem.attr('altText');
					var thumbImg = thumbImgElem.text();
					
					var itemClass = '';
					if (thumbType == 'video')
						itemClass = ' class="playOverlay"';
						
					galleryThumbnailHTML += '<li' + itemClass + '><a' + selClass + ' href="' + thumbLink + '" title="' + thumbLinkTitle + '"></a>' +
						'<img alt="' + thumbImgAlt + '" src="' + thumbImg + '" /><p class="galleryThumbCaption">' + thumbCaption + '</p></li>';
						
					count++;
				});
				galleryThumbnailHTML += '</ul>';
					
				var overlay = new Array;
				var overlayHTML = generateOverlayHTML(title, copy, galleryThumbnailHTML, trackingURL);
				
				overlay[0] = path;
				overlay[1] = title;
				overlay[2] = overlayHTML;
				overlay[3] = vid;
				overlay[4] = poster;
				overlayRefArray.push(overlay);
				var entryHTML = generateThumb(title, lede, path, thumbImg);
				thumbArray.push(entryHTML);
			});
			
			var relatedHTML = generateRelatedCareersPanel();
			thumbArray.push(relatedHTML);
			
			if ($('#videoThumbContainer')) 
				$('#videoThumbContainer').html(thumbArray.join(''));
		}
		
		// AIRMAN HEADER/INDEX HANDLER
		function parseAirmanIndex(xmlData) 
		{
			$(xmlData).find("entry").each(function() {
				var airmanName = $(this).find("name").text();
				var airmanCaption = $(this).find("caption").text();
				var airmanPath = $(this).find("pagePath").text();
				var airmanImg = $(this).find("imgPath").text();
				var airmanVid = $(this).find("vidPath").text();
				var airmanPoster = $(this).find("posterPath").text();
				var airmanHometown = $(this).find("hometown").text();
				var airmanCurrentDuty = $(this).find("currentDuty").text();
				var airmanJobTitle = $(this).find("jobTitle").text();
				var airmanJobDescription = $(this).find("jobDescription").text();
				var airmanCareerHighlights = $(this).find("careerHighlights").text();
				var airmanBackground = $(this).find("background").text();			
				var trackingURL = $(this).find("trackingURL").text();
					
				var airmanOverlay = new Array;	
				var overlayHTML = generateAirmanOverlayHTML(airmanImg, airmanName, airmanHometown, airmanCurrentDuty, 
					airmanJobTitle, airmanJobDescription, airmanCareerHighlights, airmanBackground, trackingURL);
				
				airmanOverlay[0] = airmanPath;
				airmanOverlay[1] = airmanName;
				airmanOverlay[2] = overlayHTML;
				airmanOverlay[3] = airmanVid;
				airmanOverlay[4] = airmanPoster;
				overlayRefArray.push(airmanOverlay);
				
				var embedHTML = $(this).find("headerHTML").text();
				var bgImg = $(this).find("bgImg").text()
				embedHTML += '<img alt="" src="' + bgImg + '" />';
				$('#headerImg').html(embedHTML);
				
				Cufon.refresh();
				$('#headerImg').css('display','block');
			});
		}
		
		// GENERIC HEADER/INDEX HANDLER
		function parseIndex(xmlData) 
		{
			$(xmlData).find("entry").each(function() {
				var title = $(this).find("title").text();
				var intro = $(this).find("introHTML").text();
				var bgImg = $(this).find("bgImg").text();
				var embedHTML = '<div id="headerTxt"><h1>' + title + '</h1>' + intro + '</div><img alt="" src="' + bgImg + '" />';

				$('#headerImg').html(embedHTML);
				Cufon.refresh();
				$('#headerImg').css('display','block');
			});
		}
		
		// GENERIC CTA/NEWSFEED FOOTER HANDLER
		function parseFooter(xmlData)
		{
			$(xmlData).find("cta").each(function() {
				var path = $(this).find("pagePath").text();
				var linkTitle = $(this).find("tooltip").text();
				var imgElem = $(this).find("imgCTA");
				var img = imgElem.text();
				var imgAlt = imgElem.attr('altText');
				var embedHTML = '<article class="doublePanel"><a class="CTAdoubleLink" href="' + path + '" rel="address:/' + path + '" title="' + linkTitle + '">' +
					'<img alt="' + imgAlt + '" src="' + img + '" /></a></article>';
				
				var title = $(this).find("title").text();
				var vid = $(this).find("vidPath").text();
				var poster = $(this).find("posterPath").text();
				var copy = $(this).find("copy").text();
				var trackingURL = $(this).find("trackingURL").text();
				
				// Generate the gallery thumbnails HTML
				var count = 0;
				var galleryThumbnailHTML = '<ul class="galleryThumbs">';
				$(this).find("galleryThumbnail").each(function()
				{
					var selClass = '';
					if (count == 0)
						selClass = ' class="selected"';

					var thumbType = $(this).attr('type');
					var thumbCaption =  $(this).find('caption').text();
					var thumbLinkTooltip =  $(this).find('tooltip').text();
					var thumbLinkElem = $(this).find('link');
					var thumbLink = thumbLinkElem.text();
					var thumbLinkTitle = thumbLinkElem.attr('tooltip');
					var thumbImgElem = $(this).find('img');
					var thumbImgAlt = thumbImgElem.attr('altText');
					var thumbImg = thumbImgElem.text();
					
					var itemClass = '';
					if (thumbType == 'video')
						itemClass = ' class="playOverlay"';
						
					galleryThumbnailHTML += '<li' + itemClass + '><a' + selClass + ' href="' + thumbLink + '" title="' + thumbLinkTitle + '"></a>' +
						'<img alt="' + thumbImgAlt + '" src="' + thumbImg + '" /><p class="galleryThumbCaption">' + thumbCaption + '</p></li>';

					count++;
				});
				galleryThumbnailHTML += '</ul>';
				
				var overlay = new Array;
				var overlayHTML = generateOverlayHTML(title, copy, galleryThumbnailHTML, trackingURL);
			console.log('sss');
				overlay[0] = path;
				overlay[1] = title;
				overlay[2] = overlayHTML;
				overlay[3] = vid;
				overlay[4] = poster;
				overlayRefArray.push(overlay);
						
				$('#footerContent').prepend(embedHTML);
				Cufon.refresh();
				$('#footerContent').css('display','block');	
			});	
			
			animatedRolloverOn();
			finishPageLoad();
		}
		
		// GENERIC CONTACT PANEL HTML GENERATOR
		function generateContactPanel()
		{
			return '<div class="textPanel singlePanel"><h3>Contact Us</h3><p>If you want to learn more about the opportunities waiting for you in the U.S. Air Force, we can help.</p>' + 
				'<a class="askAQuestion" href="https://secure.airforce.com/question/" target="_blank">Ask a question to learn more</a>' +
				'<a class="chatLive" href="http://airforce.com/contact-us/live-chat/" target="_blank">Chat live with an adviser</a></div>';
		}
		
		// GENERIC CONTACT PANEL HTML GENERATOR
		function generateRelatedCareersPanel()
		{
			return '<div class="textPanel singlePanel"><h3>Related Careers</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum, felis. ' +
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' + 
				'<a class="CTAbtn" href="http://airforce.com/" target="_blank">Explore Now</a></div>';
		}
		
		// GENERIC THUMBNAIL HTML GENERATOR
		function generateThumb(title, caption, path, img)
		{
			var html = '<article class="videoThumb"><section class="videoCTA">' +
				'<h2>'+title+'</h2><p>'+caption+'<br /><a class="CTAbtn" href="'+path+'" rel="address:/'+path+'">Play Video</a></p>' +
				'</section><img alt="'+caption+'" src="'+img+'" /></article>';
			
			return html;
		}
		
		// AIRMAN OVERLAY HTML GENERATOR
		function generateAirmanOverlayHTML(img, name, hometown, duty, jobTitle, jobDesc, highlights, background, trackingURL)
		{
			var html = '<div id="overlayContent"><a class="CTAbtn closeButton" href="javascript:void(0);" rel="address:/home">Back</a><div id="vidHolder"></div>' +
				'<div id="overlayIMG"><img src="'+img+'" /></div>' +
				'<div id="overlayInfo" class="columnOne">' +
				'<h4>Name</h4><span class="suffix">:</span><p>'+name+'</p>' +
				'<h4>Hometown</h4><span class="suffix">:</span><p>'+hometown+'</p>' +
				'<h4>Current Duty</h4><span class="suffix">:</span><p>'+duty+'</p>' +
				'<h4>Job Title</h4><span class="suffix">:</span><p>'+jobTitle+'</p>' +
				'<h4>Job Description</h4><span class="suffix">:</span><p>'+jobDesc+'</p></div>' +
				'<div id="overlayInfo" class="columnTwo"><h4>Career Highlights</h4><span class="suffix">:</span><p>'+highlights+'</p>' +
				'<h4>Background</h4><span class="suffix">:</span><p>'+background+'</p></div>' +
				'</div><img height="1" width="1" src="'+trackingURL+'"/>';
				
			return html;
		}
		
		// GENERIC OVERLAY HTML GENERATOR
		function generateOverlayHTML(title, copy, galleryThumbnails, trackingURL)
		{
			var html = '<div id="overlayContent"><a class="CTAbtn closeButton" href="javascript:void(0);" rel="address:/home">Back</a><div id="vidHolder"></div>' +
				'<div id="overlayInfo" class="fullWidth">' +
				'<h4>' + title + '</h4>' + copy + '</div>' + galleryThumbnails + 
				'</div><img height="1" width="1" src="' + trackingURL + '"/>';
				
			return html;
		}
		
		// HANDLE XML LOAD
		function loadXML() 
		{
			switch (secondaryPageOptions.mode)
			{
				case 'airman':
					doAJAX('xml/amair_index.xml', parseAirmanIndex);
					doAJAX('xml/amair_thumbs.xml', parseAirmanThumbs);
					break;
				case 'human':
					doAJAX('xml/human_index.xml', parseIndex);
					doAJAX('xml/human_thumbs.xml', parseThumbs);
					doAJAX('xml/human_footer.xml', parseFooter);
					break;
				default:
					doAJAX('xml/index.xml', parseIndex);
					doAJAX('xml/thumbs.xml', parseThumbs);
			}
		}
		
		// DO THE ACTUAL AJAX CALL
		function doAJAX(xml, callback)
		{
			$.ajax({
				type: "GET",
				url: basePath + xml,
				dataType: "xml",
				success: callback
			});	
		}
				
		// RESIZE HANDLER
		function onResize() {
				var containerX, overlayX;
				var stageWidth = $(window).width();
				var stageHeight = $(window).height();
				containerX = ((stageWidth - 965)/2);
				overlayX = ((stageWidth - 864)/2);
				windowHeight = $(document).height();
				windowWidth = $(document).width();
				if($('#vidOverlay')) $('#vidOverlay').height(windowHeight).width(windowWidth);
				
				//$('#main').css('top',value1+'px');	
				//$('#container-airmen').css('left',containerX+'px');
				//if ($('#amair_overlayContent')) $('#amair_overlayContent').css('left',overlayX+'px');
		}
		
		
		/*******************DOM READY HANDLER*******************/
		function finishPageLoad() {
			onResize();
			Cufon.refresh();
			// Event handlers
			$.address.init(function(event) {
				/* Initializes the plugin*/
				$('a.CTAbtn, a.CTAdoubleLink').address();
				//$('a.CTAdoubleLink').address();
			}).change(function(event) {
				onChange(event);
			});
			$('#container').css('display','block');
		
			$(window).resize(function() {onResize();});
		}
		
		Cufon.now();
		VideoJS.setupAllWhenReady();
		
		$('#arrowNav').click(function() {
			var whichHeader = $('#videoThumbContainer');
			var headerTop = whichHeader.top;
			$("html, body").animate({ scrollTop: headerTop }, 300);
		});
		
		// OVERLAY GALLERIES
		$('#vidOverlay .galleryThumbs a').live('click', function()
		{
			if (!$(this).hasClass('selected'))
			{
				$('#vidOverlay .galleryThumbs .selected').removeClass('selected');
				$(this).addClass('selected');
				
				var link = $(this);
				var href = link.attr('href');
				
				var content = $('#vidOverlay #vidHolder');
				var loading = '<div class="swapLoading"></div>';
				
				var hasVideo = link.parent().hasClass('playOverlay');
				
				// Overlay loading spinner by fading in
				content.prepend(loading);
				content.find('.swapLoading').fadeTo(400, 1, function()
				{
					content.find('object, img, #vidStub').remove();
					
					if (hasVideo)
					{
						// Assume poster naming convention
						var poster = 'img' + href.substring(href.lastIndexOf('/'), href.lastIndexOf('.')) + '_poster.jpg';
	
						// Add the video to the container inside a holding elem
						content.prepend('<div id="vidStub"></div>');
						addVideo('vidStub', href, poster, '', 'true', 864, 486);
						
						// Fade in (v.quickly) the video inside holding elem
						content.find('#vidStub').fadeTo(100, 1, function()
						{
							// Remove loading spinner by fading out
							content.find('.swapLoading').fadeTo(200, 0, function()
							{
								$(this).remove(); // Remove loading spinner
							});						
						});
					}
					else
					{
						// Preload the new image in the BG (behind loading spinner)
						var img = new Image();
						$(img).load(function()
						{
							var newElem = '<img alt="' + link.attr('title') + '" src="' + href + '" />';
							content.prepend(newElem);
							
							// Remove loading spinner by fading out
							content.find('.swapLoading').fadeTo(200, 0, function()
							{
								$(this).remove(); // Remove loading spinner
							});
						}).attr('src', href);
					}
				});
			}
			
			return false;
		});

		
		Cufon.replace('#container p,#vidOverlay p, h1, h2', { fontFamily: 'DIN-Regular' });
		Cufon.replace('#headerTxt h1, h4, h3, span.suffix', { fontFamily: 'DIN-Bold' });
		Cufon.replace('#headerTxt p, #headerCTA p, .videoCTA p', { fontFamily: 'DIN-Regular' });
		Cufon.replace('.generic #headerTxt p', { fontFamily: 'DIN-Bold' });
		Cufon.replace('a.CTAbtn', {hover: true,hoverables: { a: true },fontFamily: 'DIN-Bold'});

		loadXML();
	}
}

$(document).ready(function() {
	SecondaryPage.init();
});