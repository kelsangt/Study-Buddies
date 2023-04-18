import {useState, useRef, useEffect} from 'react';
import './GMap.css';
import {renderToString} from 'react-dom/server'
import InfoBoxInternal from './marker/InfoBoxInternal';
import NavBar from '../NavBar/NavBar';
import { getEvents } from '../../store/events';
import { useSelector } from 'react-redux';
import { getLocations } from '../../store/locations';
import EventSideBar from '../EventsSidebar';

const GMap = ({center, zoom}) => {
	const [map, setMap] = useState();
	const centerCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 16;
	const ref = useRef();
	const markers = useRef([]);
	const infoTiles = useRef([]);
	const userLocationCoords = useRef({});
	const events = useSelector(getEvents);
	const image = "../icon.png";
	const blueIcon = "../bluemarker.png"	

	// Geolocation Button
	const infoWindow = new window.google.maps.InfoWindow(); 
	const locationButton = document.createElement("button");
	locationButton.textContent = "Click to View Study Sessions In Your Area"
	locationButton.classList.add("custom-map-control-button")

	const stylesArray = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
    }
];

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation 
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

const findGeoLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const userLocation = {
					lat: position.coords.latitude, 
					lng: position.coords.longitude
				};
				userLocationCoords.current = userLocation; 
				// Setting the map to the new location. 
				const newMap = new window.google.maps.Map(ref.current, {
					center: { lat: userLocation.lat, lng: userLocation.lng},
					zoom: zoomAmount,
					styles: stylesArray
				})
				newMap.setCenter(userLocation);
				newMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
				setMap(newMap);
			},
			() => {
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

	useEffect(() => {
		const initialMap = new window.google.maps.Map(ref.current, {
			center: { lat: centerCoords.lat, lng: centerCoords.lng},
			zoom: zoomAmount,
			styles: stylesArray
		})

		initialMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
		locationButton.addEventListener("click", findGeoLocation);

		setMap(initialMap)
	}, []);

	useEffect(() => {
		// Creating all Event Markers and placing them on the map. 
		let eventMarkers = [];
		events.forEach(event => {
			eventMarkers.push(new window.google.maps.Marker({
				position: {lat: event.location.latitude, lng: event.location.longitude},
				map: map, 
				title: event.description, 
				icon: {
					url: image, 
					scaledSize: new window.google.maps.Size(64, 64)
				}
			}));
		});
		
		// Setting the markers Ref to the eventMarkers Array
		markers.current = eventMarkers;
		
		// Setting the infoTiles Ref to an array of empty InfoWindows the same length as the eventMarkers Array.
		infoTiles.current = eventMarkers.map(() => new window.google.maps.InfoWindow({ content: ""}));

		// Creating The Content of the InfoTiles and Putting into array (the same legnth as markers.current.) It creates new InfoBoxInternal components with the event[i] passed as a prop. 
		const infoTileAttachments = [];
		for (let i = 0; i < markers.current.length; i++) {
			infoTileAttachments.push(renderToString(<div id="InfoBoxInternal_wrapper"><InfoBoxInternal event={events[i]} /></div>))
		}

		// Setting the content of infoTiles.current ref with the content in infoTileAttachments
		for (let i = 0; i < infoTiles.current.length; i++) {
			infoTiles.current[i].setContent(infoTileAttachments[i]); 
		}
		
		// Adding the listener to show the InfoTile on mouseover. 
		for (let i = 0; i < markers.current.length; i++) {
			markers.current[i].addListener("click", () => {
				infoTiles.current[i].open({
					anchor: markers.current[i],
					map
				})
			})
		}

		if (userLocationCoords) {
			const locationMarker = new window.google.maps.Marker({
				position: {lat: userLocationCoords.current.lat, lng: userLocationCoords.current.lng},
				map: map, 
				icon: {
					url: blueIcon, 
					scaledSize: new window.google.maps.Size(64, 64)
				}
			});
			
			infoWindow.setPosition(userLocationCoords.current);
			infoWindow.setContent("Your Approximate Location.")
			infoWindow.open({
				anchor: locationMarker,
				map: map 
			})
		}

	}, [map, events])

	return (
		<>
			<NavBar />
			<div id="map_container">
				<EventSideBar />
				<div id="map_wrapper">
					<div ref={ref} id="map" />
				</div>
			</div>
		</>
	)
}

export default GMap;