var ostest = {};


// CONFIG
ostest.errorMessages = {
    locationValidationError : 'Please start typing your location then select your location from the list of suggestions.',
    generalError            : 'Sorry, something went wrong.',
    distanceMatrixError     : 'Error calculating distances.'
};



/*  Will store locations once we've fetched them from the database -
    Distance/duration info is appended by findNearest() which 
    also sorts the locations by their distance from the user's location.
*/
ostest.locations = [];

// will store google map object
ostest.map = null; 
ostest.bounds = null;

// will store user's location (as a google.maps.LatLng object)
ostest.userMapPoint = null;

ostest.markers = [];

ostest.removeMarkers = function () {
    for (var i = 0; i < ostest.markers.length; i++) {
        ostest.markers[i].setMap(null);
    }
};

// function to add a new location
ostest.addLocation = function(name, lat, lng) {
    
    $.ajax({
        url: 'locations.php?method=add',
        data: { 
            'name'  : name, 
            'lat'   : lat, 
            'lng'   : lng
        },
        success: function(response) {
            ostest.notify('<strong>' + name + '</strong> has been added to the datbabase.');
            // update locations
            ostest.fetchLocations();
        },
        error: function(xhr) {
            ostest.notify(ostest.errorMessages.generalError);
        }
    });
    
};

ostest.notify = function(message) {
    
    $('#generalModal .modal-body').html(message);
    $('#generalModal').modal();
 
};

// fetch a JSON dump of all locations
ostest.fetchLocations = function() {

    $.getJSON('locations.php', function (data) {
        
        // store locations locally
        ostest.locations = data;
        
    });
};

// use Distance Matrix service to find distance/travel time from user's location to each location in the database
ostest.findNearest = function(name, lat, lng) {
    
    ostest.userMapPoint = new google.maps.LatLng(lat, lng);
    
    // create origins array
    var origins = []; 
    origins.push(ostest.userMapPoint);
  
    // create destinations array
    var destinations = [];
    var mapPoint;
    for (var i = 0, len = ostest.locations.length; i < len; i++) {
        mapPoint = new google.maps.LatLng(ostest.locations[i].lat, ostest.locations[i].lng);
        destinations.push(mapPoint);
        ostest.locations[i].mapPoint = mapPoint;
    }  
    
    // fetch info
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
        
        origins: origins,
        destinations: destinations,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
        
    }, function(response, status) {
        
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            
            ostest.notify(ostest.errorMessages.distanceMatrixError);
            
        } else {
            
            var elements = response.rows[0].elements;
              
            // extend location objects with distance/duration info
            for (var i = 0, len = elements.length; i < len; i++) {
                ostest.locations[i].distanceText = elements[i].distance.text;
                ostest.locations[i].distanceValue = elements[i].distance.value;
                ostest.locations[i].durationText = elements[i].duration.text;
                ostest.locations[i].durationValue = elements[i].duration.value;                
            }
            
            // sort by distance
            ostest.locations.sort(function(a, b) {
                return a.distanceValue - b.distanceValue;
            }); 
              
            ostest.displayResults();
        }
    });

    
    
    
};

ostest.displayResults = function() {
    
    ostest.removeMarkers(); 
    
    // user's location
    ostest.bounds.extend(ostest.userMapPoint);
    ostest.markers.push( new google.maps.Marker({
        position: ostest.userMapPoint,
        map: ostest.map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }));    
    
    
    for (var i = 0, len = ostest.locations.length; i < len; i++) {
        ostest.bounds.extend(ostest.locations[i].mapPoint);
        ostest.markers.push(new google.maps.Marker({
            position: ostest.locations[i].mapPoint,
            map: ostest.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }));
    }
    ostest.map.fitBounds(ostest.bounds);
    
    var html = '<p>Your nearest Onstate is <strong>' 
    + ostest.locations[0].name + '</strong> which is '
    + '<strong>' + ostest.locations[0].distanceText 
    + '</strong> (approx <strong>' 
    + ostest.locations[0].durationText 
    + '</strong> drive) away.</p>'
    + '<hr /><h4>Locations by distance</h4>'
    + '<table class="table">'
    + '<thead><tr><th>Name</th><th>Distance</th><th>Drive Time</th></thead><tbody>';
    
    for (var i = 0, len = ostest.locations.length; i < len; i++) {
        html += '<tr><td>' + ostest.locations[i].name + '</td>'
        + '<td>' + ostest.locations[i].distanceText + '</td>'
        + '<td>' + ostest.locations[i].durationText + '</td></tr>';
    }
    
    + '</tbody></table>';
    
    $('#resultsModal .modal-body').html(html);
    
    $('#resultsModal').modal();
    
};

function initMap() {

    ostest.bounds = new google.maps.LatLngBounds();
    ostest.map = new google.maps.Map(document.getElementById('map'), {
        // center on london initially
        center: {
            lat: 51.50735090,
            lng: -0.12775830
        },
        zoom: 13
    });

    // grab input elements
    var searchLocationInput = document.getElementById('search-location-input');
    var addLocationInput = document.getElementById('add-location-input');

    // autocomplete options
    var options = {
        types: ['(cities)'],
        componentRestrictions: {
            country: 'gb'
        }
    };

    // couple autocomplete objects to their inputs (and empty inputs)
    $(searchLocationInput)
        .data('autocomplete', new google.maps.places.Autocomplete(searchLocationInput, options))
        .val('');
    
    $(addLocationInput)
        .data('autocomplete', new google.maps.places.Autocomplete(addLocationInput, options))
        .val('');


}



ostest.init = function() {
    
    // size map based on available space
    var takenHeight = $('#top').outerHeight() + $('#bottom').outerHeight();
    var mapHeight = ($(window).height() - takenHeight) - 100;
    $('#map').css('height', mapHeight);
    
    
   // button behaviours
    $('#button-search').click(function(e) {
        e.preventDefault();
        
        var autocomplete = $('#search-location-input').data('autocomplete');
        var place = autocomplete.getPlace();
        if(!place) {
            ostest.notify(ostest.errorMessages.locationValidationError);
            return;
        }
        
        // get name/lat/lng
        var name = place.name;
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();   
        
        ostest.findNearest(name, lat, lng);
        

    });
    
    $('#button-add').click(function(e) {
        e.preventDefault();
        
        var autocomplete = $('#add-location-input').data('autocomplete');
        var place = autocomplete.getPlace();
        if(!place) {
            ostest.notify(ostest.errorMessages.locationValidationError);
            return;
        }        
        
        // get name/lat/lng
        var name = place.name;
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        
        ostest.addLocation(name, lat, lng);
        
    });    
    
    
    ostest.fetchLocations();    
    
};

$(function() {
    ostest.init();
});