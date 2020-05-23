'use strict';

let myMap;
let mapCenter = {lat: 49.038542, lng: 30.451260};
let markers = [];
let infoWindow;
let markerCluster;

import MarkerClusterer from "./vendor/markerclusterer";

/**
 * Map initialization
 */
function initMap() {

    let element = document.querySelector('.map__box');
    let options = {
        zoom: 6,
        center: mapCenter,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
        },
        mapTypeControl: false,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 33
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "gamma": "0.75"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-37"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f9f9f9"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "40"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "-37"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "100"
                    },
                    {
                        "weight": "2"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "80"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": "-4"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c5dac6"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-95"
                    },
                    {
                        "lightness": "62"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "gamma": "1.00"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "gamma": "0.50"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "gamma": "0.50"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c5c6c6"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "-13"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "lightness": "0"
                    },
                    {
                        "gamma": "1.09"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e4d7c6"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "47"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "-12"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fbfaf7"
                    },
                    {
                        "lightness": "77"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "-5"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "-15"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": "47"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#acbcc9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": "53"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-42"
                    },
                    {
                        "saturation": "17"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "lightness": "61"
                    }
                ]
            }
        ],
    };

    myMap = new google.maps.Map(element, options);

    addMarkers();
    addControls();
}

window.initMap = initMap;

/**
 * Add markers
 */
function addMarkers() {
    let dealers = storesData;
    dealers.forEach(function (dealer) {
        let marker = new google.maps.Marker({
            position: {
                lat: +dealer.dealerLocation.lat,
                lng: +dealer.dealerLocation.lng},
            map: myMap,
            animation: google.maps.Animation.DROP,
            icon: `${templateUrl}/img/map/marker.svg`,
            // visible: false,
            regionID: dealer.dealerRegion.term_id,
            company: dealer.dealerCompany,
            address: dealer.dealerAddress,
            phones: dealer.dealerPhones,
            site: dealer.dealerSite,
        });

        markers.push(marker);

        // Add info window
        infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(`<div class="info-window">
                                       <p class="info-window__title">${marker.company}</p>
                                       <p class="info-window__address">${marker.address}</p>
                                       <a class="info-window__phone" href="tel:${marker.phones}">${marker.phones}</a><br>
                                       <a class="info-window__site" href="${marker.site}" target="_blank">${marker.site}</a>
                                   </div>`);
            infoWindow.open(myMap, marker);
        });

        function initMarkerCluster() {
            markerCluster = new MarkerClusterer(myMap, markers, {
                gridSize: 40,
                // averageCenter: true,
                ignoreHiddenMarkers: true,
                styles: [{
                    url: `${templateUrl}/img/map/cluster.svg`,
                    width: 44,
                    height: 57,
                    anchor: [-14, 0],
                    textColor: "#252528",
                    textSize: 12,
                }]
            });
        }

        initMarkerCluster();

        myMap.addListener('zoom_changed', function() {
            initMarkerCluster();
        });

    });

}

/**
 * Add Controls
 */
function addControls() {
    let mapFilterSelect = document.getElementById('map-filter-select');
    let dealersList = document.querySelectorAll('.dealer-table tr');

    mapFilterSelect.addEventListener('change', function () {
        let currentRegionID = this.value;

        dealersList.forEach(function (dealer) {
            let dealerRegionID = dealer.getAttribute('data-region-id');

           if ( dealerRegionID === currentRegionID || currentRegionID === 'all-regions' ) {
               dealer.style.display = 'table-row';
           } else {
               dealer.style.display = 'none';
           }
        });

        markers.forEach(function (marker) {
            let markerRegionID = marker.regionID;

            if ( markerRegionID === +currentRegionID || currentRegionID === 'all-regions' ) {
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        });

        // myMap.panTo({lat: regionCenterLat, lng: regionCenterLng});
        markerCluster.repaint();
        myMap.setZoom(6);
        // if (regionCurrentIndex == 1) {
        //     myMap.setZoom(6);
        // } else {
        //     myMap.setZoom(12);
        // }
    });
}
