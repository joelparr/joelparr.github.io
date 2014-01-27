// Global object 
var coinopApp = {};

// Constants
coinopApp.basePath = 'http://joelparr.com/work/coinop/';
coinopApp.imgBasePath = coinopApp.basePath + 'images/';
coinopApp.fusionTableID = '1066373';
coinopApp.fusionBase = 'https://www.google.com/fusiontables/api/query/?sql=';
coinopApp.fusionTail = '&jsonCallback=?';

// Objects
coinopApp.map = {};
coinopApp.marker = {};
coinopApp.service = {};
//coinopApp.bubble = {};
coinopApp.infoBubble = {};

// Don't allow adding in these Place types
coinopApp.searchOnlyLocations = 
[
	'administrative_area_level_1','administrative_area_level_2',
	'administrative_area_level_3','colloquial_area','country',
	'floor','intersection','locality','natural_feature','neighborhood',
	'political','point_of_interest','post_box','postal_code',
	'postal_code_prefix','postal_town','premise','room','route',
	'sublocality','sublocality_level_4','sublocality_level_5',
	'sublocality_level_3','sublocality_level_2','sublocality_level_1'
];

// On page load:
// Setup map and logic
coinopApp.initialize = function() 
{
	// Create our map
	var mapOptions = 
	{
		center: new google.maps.LatLng(38,-97),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);	
	
	// Reusable objects
	//bubble = new google.maps.InfoWindow();
	infoBubble = new InfoBubble({});
	marker = new google.maps.Marker({map: map});
	service = new google.maps.places.PlacesService(map);

	// Setup autocomplete with region bias
	var input = document.getElementById('searchTextField');
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.region = 'us'; // TODO this is for searching. for adding, detect location?
	autocomplete.bindTo('bounds', map);
	
	// Create Fusion table layerand overlay on map  
	var	layer = new google.maps.FusionTablesLayer(
	{
	  query: 
	  {
	    select: 'Location',
	    from: coinopApp.fusionTableID
	  },
	  styles:
	  [
	  	{ markerOptions: { iconName: 'red_dot' } },
	  	{ where: 'Games = \'Galaga\'', markerOptions: { iconName: 'yellow_dot' } },
	  	{ where: 'Games = \'Tekken\'', markerOptions: { iconName: 'blue_dot' } },
	  	{ where: 'Games = \'Pacman\'', markerOptions: { iconName: 'green_dot' } }
	  ]
	});
	layer.setMap(map);
	layer.suppressInfoWindows = true;
	
	// On map (Places location) click:
	// Open an InfoWindow
	google.maps.event.addListener(marker, 'click', function()
  	{
  		//bubble.close();
  		//bubble.open(map, marker);
  		infoBubble.close();
  		infoBubble.open(map, marker);
  	});
  	
  	// On layer (Fusion table location) click:
  	// Pop up the layer InfoWindow
  	google.maps.event.addListener(layer, 'click', function(e)
	{
		infoBubble.close();
		
		var placeRef = -1;
		var searchRequest = 
		{ 
			location: e.latLng, 
			name: e.row['Name'].value,
			radius: 5 
		};
		
		// Get the Place Reference string
		service.search(searchRequest, function(results, status)
		{
			if (status == google.maps.places.PlacesServiceStatus.OK)
			{
				placeRef = results[0].reference;
			}

			// Get the RowID
			var fusionQuery = 'SELECT RowID FROM ' + coinopApp.fusionTableID + ' WHERE ST_INTERSECTS(Location, CIRCLE(LATLNG(' + e.row['Location'].value + '), 1))';
			var fusionURL = encodeURI(coinopApp.fusionBase + fusionQuery + coinopApp.fusionTail);

			// Make the AJAX call, get JSON in response
			$.getJSON(fusionURL, function(data)
			{	
				if (data.table.rows.length > 0)
				{	
					var html = coinopApp.buildBubbleContentWithAction
					(
						placeRef,
						data.table.rows[0][0],
						e.row['Name'].value, 
						e.row['Games'].value, 
						e.row['Address'].value, 
						e.row['Location'].value, 
						coinopApp.imgBasePath + coinopApp.getSelectedGame(e.row['Games'].value) + '_logo.gif'
					);
		
					coinopApp.setupInfoBubble(html, e.latLng);
					infoBubble.open();
				}
			});
		});
	});

	// On Places autocomplete box change (select location):
	// Find and plot Places location and pull in fusion table data (if exists)
	google.maps.event.addListener(autocomplete, 'place_changed', function()
	{
	    infoBubble.close(); 
	    //bubble.close();
	    
	    var place = autocomplete.getPlace();
	    
	    if (place.geometry.viewport) 
	    {
			map.fitBounds(place.geometry.viewport);
	    } 
	    else 
	    {
			map.setCenter(place.geometry.location);
			map.setZoom(16);
	    }
	
	    var address = '';
	    if (place.address_components) 
	    {
	      address = [
	        (place.address_components[0] &&
	         place.address_components[0].short_name || ''),
	        (place.address_components[1] &&
	         place.address_components[1].short_name || ''),
	        (place.address_components[2] &&
	         place.address_components[2].short_name || '')].join(' ');
	    }
		
		// If this is a search-only location, move map here and bail
		if (coinopApp.isSearchOnlyLocation(place.types))
		{
			map.setCenter(place.geometry.location);
			return false;
		}
		
		coinopApp.queryPlaceAndPlot(place, null);
    });
    
    // On checkbox click (check):
    // Filter the layer query to only show locations with specific game(s)
    // TODO get colored icons working properly for multi-selections
	$('#filters input:checkbox').click(function() 
	{
		layer.setMap(null);
		
		var boxesArr = [];
		 $('#filters input:checkbox:checked').each(function()
		 {
		 	boxesArr.push('Games LIKE \'%' + $(this).val() + '%\'');
		 });
		 var boxes = boxesArr.join(' OR ');
		
		layer = new google.maps.FusionTablesLayer(
		{
		  query: 
		  {
		    select: 'Location',
		    from: coinopApp.fusionTableID,
		    where: boxes
		  },
		  styles:
		  [
		  	{ markerOptions: { iconName: 'red_dot' } },
		  	{ where: 'Games = \'Galaga\'', markerOptions: { iconName: 'yellow_dot' } },
		  	{ where: 'Games = \'Tekken\'', markerOptions: { iconName: 'blue_dot' } },
		  	{ where: 'Games = \'Pacman\'', markerOptions: { iconName: 'green_dot' } }
		  ]
		});
		
		layer.setMap(map);
	});
}

// Create new instance of the bubble
coinopApp.setupInfoBubble = function(contentHTML, latLng)
{
	infoBubble = new InfoBubble
	(
		{ 
	    	map: map,
	      	content: contentHTML,
	      	position: latLng,
	      	shadowStyle: 1,
	      	padding: 0,
	      	backgroundColor: '#1b1b1b',
	      	borderRadius: 10,
	      	borderWidth: 0,
	      	borderColor: '#333333',
	      	disableAutoPan: false,
	      	hideCloseButton: false,
			arrowSize: 15,
	      	arrowPosition: 50,
	      	arrowStyle: 0	
	   }
	);
}

// Queries Fusion table and plots Place on map
// TODO fail nicely
coinopApp.queryPlaceAndPlot = function(place, anim)
{	
	var placeRowID = -1;
	var placeImgName = 'coinop'
	var placeName = place.name;
	var placeGames = 'None yet - add one!';
	var placeAddress = place.formatted_address;
	var placeLatLng = place.geometry.location.toUrlValue();

	var fusionQuery = 'SELECT RowID, Name, Address, Games, Location FROM ' + coinopApp.fusionTableID + ' WHERE ST_INTERSECTS(Location, CIRCLE(LATLNG(' + placeLatLng + '), 1))';
	var fusionURL = encodeURI(coinopApp.fusionBase + fusionQuery + coinopApp.fusionTail);

	// Make the AJAX call, get JSON in response
	$.getJSON(fusionURL, function(data)
	{	
		if (data.table.rows.length > 0)
		{	
			placeRowID = data.table.rows[0][0];
			placeImgName = coinopApp.getSelectedGame(data.table.rows[0][3]);
			placeName = data.table.rows[0][1];
			placeGames = data.table.rows[0][3];
			placeAddress = data.table.rows[0][2];
		}
	
	    /*var image = new google.maps.MarkerImage
	    (
	        //coinopApp.imgBasePath + placeImgName + '.png', new google.maps.Size(48, 48),
	        new google.maps.Point(0, 0), new google.maps.Point(25, 48)
		);
	    marker.setIcon(image);*/
	    
	    marker.setIcon(coinopApp.getSelectedIcon(placeGames));
	    marker.setAnimation(anim);
	    marker.setPosition(place.geometry.location);
    
		var bubbleContent = coinopApp.buildBubbleContentWithAction
		(
			place.reference, placeRowID, placeName, placeGames, placeAddress, placeLatLng, 
			coinopApp.imgBasePath + placeImgName + '_logo.gif'
		);

		coinopApp.setupInfoBubble(bubbleContent, place.geometry.location);
		infoBubble.open(map, marker);
		
		//bubble.setContent(bubbleContent);
		//bubble.open(map, marker);
		
	});
}

// On Add/Update location handler:
// AJAX POST to add new location to Fusion table
// TODO handle post addition event  + failure + all empty checkboxes case
coinopApp.updateFusionTable = function(formElem)
{
	var searchPrefix = '#' + formElem.id + ' ';
	var num = $(searchPrefix + 'input:checkbox:checked').length;

	if (num > 0)
	{
		var op = $(searchPrefix + '#action-operation').val();
		var placeRef = $(searchPrefix + '#action-placeref').val();
		var loc = $(searchPrefix + '#action-location').val();

		var gamesArr = [];
		gamesArr.length = 0;

		$(searchPrefix + 'input:checkbox:checked').each(function()
		{
			gamesArr.push($(this).val());
		});
		var gamesStr = gamesArr.join(',');
		
		if (op == 'insert')
		{
			var params = 
			{	
				operation: op,
				name: $(searchPrefix + '#action-name').val(),
				address: $(searchPrefix + '#action-address').val(),
				location: loc,
				games: gamesStr
			};
		}
		else if (op =='update')
		{
			var params = 
			{	
				operation: op,
				rowid: $(searchPrefix + '#action-rowid').val(),
				games: gamesStr
			};
		}
		
		// Make the change and re-plot the Place on the map
		$.post(coinopApp.basePath + 'submit.php', params, function(data)
		{
			//bubble.close();
			infoBubble.close();
			
			service.getDetails({reference: placeRef}, function(place, status)
			{
				if (status == google.maps.places.PlacesServiceStatus.OK)
				{
					coinopApp.queryPlaceAndPlot(place, google.maps.Animation.DROP);
					alert('Added/Updated!');
				}
				else 
				{
					alert('Added/Updated, but something went wrong');
					console.log(status);
				}
			});
		});
	}
}

// Return game name or default in lowercase
coinopApp.getSelectedGame = function(fusionName)
{
	var name = '';
	
	if (fusionName == 'Galaga') name = 'galaga';
	else if (fusionName == 'Tekken') name = 'tekken';
	else if (fusionName == 'Pacman') name = 'pacman';
	else name = 'coinop';
	
	return name;
}


// Return game icon or default icon
coinopApp.getSelectedIcon = function(fusionName)
{
	var name = '';
	
	if (fusionName == 'Galaga') name = 'yellow-dot';
	else if (fusionName == 'Tekken') name = 'blue-dot';
	else if (fusionName == 'Pacman') name = 'green-dot';
	else name = 'red-dot';
	
	return 'http://maps.google.com/mapfiles/ms/micons/' + name + '.png';
}

// Check to see if we should should show an InfoWindow
// and allow adding at this location
coinopApp.isSearchOnlyLocation = function(types)
{	
	var isSearchOnly = false;

	if (types.length > 0)
	{
		$.each(types, function(index, value)
		{
			if ($.inArray(value, coinopApp.searchOnlyLocations) != -1)
			{
				isSearchOnly = true;
				return false;
			}
		});
	}
	
	return isSearchOnly;
}

// Build InfoWindow content for layer (Fusion Table) locations
coinopApp.buildBubbleContent = function(title, games, address, location, image)
{
	var html = '';
	
	html = '<div class="bubble">';
	html += '<div class="l"><h1>' + title + '</h1>';
	html += '<p><b>Game(s):</b> ' + games + '</p>';
	html += '<p>' + address + '</p></div>';
	html += '<div class="r">';
	html += '<img alt="' + title + '" src="' + image + '" /></div>';
	html += '</div>';
	
	return html;
}

// Build InfoWindow content for locations
// TODO fail nicely and set operation more cleanly
coinopApp.buildBubbleContentWithAction = function(placeref, rowid, title, games, address, location, image)
{
	var html = '';
	var bubbleID = Math.random().toString().split('.')[1];
	var gamesArr = games.split(',');
	var operation = (gamesArr[0].indexOf('None yet') == -1) ? 'update' : 'insert';
	
	html = '<div class="bubble wide">';
	html += '<div class="l"><h1>' + title + '</h1>';
	html += '<p><b>Game(s):</b> ' + games + '</p>';
	html += '<p>' + address + '</p>';
	html += '<p><b>What\'s here?:</b></p>';
	html += '<form action="POST" id="action-bubble-' + bubbleID + '"><input type="hidden" name="action-operation" id="action-operation" value="' + operation + '" />';
	html += '<input type="hidden" name="action-placeref" id="action-placeref" value="' + placeref + '" />';
	html += '<input type="hidden" name="action-rowid" id="action-rowid" value="' + rowid + '" />';
	html += '<input type="hidden" name="action-name" id="action-name" value="' + title + '" />';
	html += '<input type="hidden" name="action-address" id="action-address" value="' + address + '" />';
	html += '<input type="hidden" name="action-location" id="action-location" value="' + location + '" />';
	html += '<p><input type="checkbox" name="action-galaga" id="action-galaga" value="Galaga"' + coinopApp.setCheckbox('Galaga', gamesArr) + '> Galaga<br />';
	html += '<input type="checkbox" name="action-tekken" id="action-tekken" value="Tekken"' + coinopApp.setCheckbox('Tekken', gamesArr) + '> Tekken<br />';
	html += '<input type="checkbox" name="action-pacman" id="action-pacman" value="Pacman"' + coinopApp.setCheckbox('Pacman', gamesArr) + '> Pacman</p>';
	html += '<p><input type="button" id="action-button" value="Add/Update Game(s)" onclick="coinopApp.updateFusionTable(this.form); return false;" /></p>';
	html += '</form></div>';
	html += '<div class="r">';
	html += '<img alt="' + title + '" src="' + image + '" /></div>';
	html += '</div>';
	
	return html;	
}

// Return 'checked' string attribute if value is in searchArr
coinopApp.setCheckbox = function(value, searchArr)
{
	var attrib = '';
	
	if ($.inArray(value, searchArr) != -1)
	{
		attrib = ' checked="true"';
	}
	
	return attrib;
}

// Kick everything off
google.maps.event.addDomListener(window, 'load', coinopApp.initialize);

/*
// Code to clear markers from map
google.maps.Map.prototype.markers = new Array();
google.maps.Map.prototype.getMarkers = function() { return this.markers; };
google.maps.Map.prototype.clearMarkers = function() 
{
    for(var i=0; i<this.markers.length; i++){
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};
google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;
google.maps.Marker.prototype.setMap = function(map) 
{
    if (map) {
        map.markers[map.markers.length] = this;
    }
    this._setMap(map);
}*/