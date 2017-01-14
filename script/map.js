function initMap() {
    var center = {lat: 50.3882992, lng: 30.4933113};


    var map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    });

    var marker = new google.maps.Marker({
        position: center,
        map: map,
        title: "My office"
    });

    marker.setMap(map);

    var stylesArray = [
        {
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "saturation": 50
                },
                {
                    "gamma": 0
                },
                {
                    "hue": "#50a5d1"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#333333"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "weight": 0.5
                },
                {
                    "color": "#333333"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "gamma": 1
                },
                {
                    "saturation": 50
                }
            ]
        }
    ];

    var styledMap = new google.maps.StyledMapType(stylesArray, {name: "Styled Map"});

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');


    function addMarker(name, coordinateLat, coordinateLng) {
        var worker1 = new google.maps.Marker({
            position: {lat: +coordinateLat, lng: +coordinateLng},
            map: map,
            title: name,
            icon: {
                url: "http://iv.bh/images/icons/map_icon.png",
                scaledSize: new google.maps.Size(35, 40)
            }
        });
    }

    addMarker('Yana Melnik', '50.3974599', '30.5083627');

}

initMap();