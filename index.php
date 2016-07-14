<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Find your nearest Onstate</title>
    
    <!-- Include bootstrap CSS -->
    <link rel="stylesheet" 
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
          crossorigin="anonymous">
    
    <!-- Include overides/map styles  -->
    <link rel="stylesheet" 
          href="css/styles.css">

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    

</head>

<body class="text-center">
    <div class="container-fluid">
        
        <div id="top">
            <h1>Find your nearest Onstate</h1>
            <form>
                <div class="input-group">
                    <input type="text" class="form-control" id="search-location-input" placeholder="Enter your location" />
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" id="button-search">Go!</button>
                    </span>
                </div>  
            </form>
        </div>
            
        <div id="map"></div>
        
        <div id="bottom">
            <p><a href="#" data-toggle="modal" data-target="#addLocationModal">Add a new location</a></p>
        </div>
        
    </div>
    
    
    
    <!-- "Add location" modal -->
    <div id="addLocationModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add a new location</h4>
                </div>
                <div class="modal-body">
                    <div class="input-group">
                        <input type="text" id="add-location-input" placeholder="Enter a location" class="form-control" />
                        <span class="input-group-btn">
                            <button id="button-add" class="btn btn-primary">Add New</button> 
                        </span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
    
    <!-- Modal for showing search results -->
    <div id="resultsModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Search results</h4>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
    
    
    <!-- General use modal for prettier alerts -->
    <div id="generalModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Onstate Test</h4>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
    
 
    <!-- Include jQuery JS -->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" 
            integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" 
            crossorigin="anonymous"></script>  
    
    <!-- Include booststrap JS -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" 
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" 
            crossorigin="anonymous"></script>
    
    <!-- Include our own JS -->
    <script src="js/main.js"></script>
    
    <!-- Include google maps JS -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8eW8lvxkAnMc6GhFlxBg1kqkiH15J98Y&libraries=places&callback=initMap"></script>
</body>

</html>