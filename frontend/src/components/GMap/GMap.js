import {useState, useRef, useEffect} from 'react';
import './GMap.css';
import { renderToString } from 'react-dom/server'
import InfoBoxInternal from './marker/InfoBoxInternal';
import NavBar from '../NavBar/NavBar';
import { getEvents } from '../../store/events';
import { useDispatch, useSelector } from 'react-redux';
import EventSideBar from '../EventsSidebar';
import { receiveEventClicked, selectedEventId } from '../../store/ui';
import { receiveAllLocations } from '../../store/locations';
import { createEventRequest } from '../../store/events';
import { showSelectedEventDetails, receiveModalToggle, receiveTabState, getReloadMapStatus, setMapReloadStatus, getFetchEvents } from '../../store/ui';


const GMap = () => {
	const dispatch = useDispatch();
	const [gMap, setGMap] = useState();
	const centerCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 16;
	
	const ref = useRef();
	const markers = useRef([]);
	const infoTiles = useRef([]);
	const userLocationCoords = useRef({});
	
	const [geoLocationClicked, setGeoLocationClicked] = useState(false);
	const [requestedLibraries, setRequestedLibraries] = useState(false);
	const events = useSelector(getEvents);

	const image = "../icon.png";
	const blueIcon = "../bluemarker.png"
	const libraryIcon = "../library_icon.png"	
	
	// Creating Geolocation Button including InfoWindow
	const infoWindow = new window.google.maps.InfoWindow(); 
	const locationButton = document.createElement("button");
	locationButton.textContent = "Click to View Study Sessions In Your Area"
	locationButton.classList.add("custom-map-control-button")

	// Map Initial Styles 
	const stylesArray = [
		{
				featureType: "poi",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
		}
	];

// Helper Function for Geolocation. 
	const findGeoLocation = () => {
		setGeoLocationClicked(false);
		setRequestedLibraries(false);

		if (!geoLocationClicked) {
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
						newMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
						setGMap(newMap);
					},
					() => {
						handleLocationError(true, infoWindow, gMap.getCenter());
					}
				);
			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, gMap.getCenter());
			}
		}
	}

// Helper Function if Geolocation is not available. 
		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(
				browserHasGeolocation 
					? "Error: The Geolocation service failed."
					: "Error: Your browser doesn't support geolocation."
			);
			infoWindow.open({
				map: gMap
			});
		}

// Helper Function for Placing the Local Libraries 
	function placeLibraries(results, status) {
		if (status == window.google.maps.places.PlacesServiceStatus.OK) {
			let googleFetchedLibraries = [];

			results.forEach(result => {
				let photoUrl = "https://upload.wikimedia.org/wikipedia/commons/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg";
				
				if (result.photos) {
					photoUrl = result.photos[0].getUrl()
				}

				googleFetchedLibraries.push({
					name: result.name,
					latitude: result.geometry.location.lat(),
					longitude: result.geometry.location.lng(),
					imageUrl: photoUrl,
					address: result.vicinity
				})

				let resultLat = result.geometry.location.lat();
				let resultLng = result.geometry.location.lng();
				
				let eventMarker = new window.google.maps.Marker({
					position: {lat: resultLat, lng: resultLng},
					map: gMap, 
					icon: {
						url: libraryIcon, 
						scaledSize: new window.google.maps.Size(54, 54)
					},
					title: result.name,
					animation: window.google.maps.Animation.DROP, 
				});
				let eventInfoWindow = new window.google.maps.InfoWindow({
					content: result.name
				})
				eventMarker.addListener("click", () => {
					eventInfoWindow.open({
						anchor: eventMarker, 
						map: gMap
					})
				}, {passive: true})
			})
			dispatch(receiveAllLocations(googleFetchedLibraries));
		}
	}

	// Helper Function to reset all markers 
	const nullAllMarkers = () => {
		if (markers.current) {
			for (let i = 0; i < markers.current.length; i++) {
				markers.current[i].setMap(null);
			}
			markers.current = [];
		}
	}

	// Helper Function to fill markers Ref. 
	const fillMarkersRefWithTodaysEvents = () => {	
		events.forEach(event => {
			markers.current.push(new window.google.maps.Marker({
				position: {lat: event.location.latitude, lng: event.location.longitude},
				map: gMap, 
				title: event.description, 
				icon: {
					url: image, 
					scaledSize: new window.google.maps.Size(64, 64)
				}
			}));
		});
		console.log(markers.current)
	}

	const fillInfoTilesRefWithContent = () => {
		const infoTileAttachments = [];
		for (let i = 0; i < markers.current.length; i++) {
			infoTileAttachments.push(renderToString(
				<div id="InfoBoxInternal_wrapper">
					<InfoBoxInternal event={events[i]} /> 
					<div id="info_links_wrapper">
						<div className="info_join_session" id={`info_join_session_${events[i]._id}`}>
							Join Session
						</div>
						<div className="info_event_details_link" id={`info_event_details_link_${events[i]._id}`}>
							Details
						</div>
						<div id="info_links_spacer"></div>
					</div>
				</div>
			))
		}

		// Setting the content of infoTiles.current ref with the content in infoTileAttachments
		for (let i = 0; i < infoTiles.current.length; i++) {
			infoTiles.current[i].setContent(infoTileAttachments[i]);
		}

		for (let i = 0; i < infoTiles.current.length; i++) {
			window.google.maps.event.addListener(infoTiles.current[i], 'domready', () => {
				document.getElementById(`info_join_session_${events[i]._id}`).addEventListener('click', () => {
					dispatch(createEventRequest(events[i]._id))
					dispatch(receiveTabState("Requested Events"))
					dispatch(receiveModalToggle(true));
				}, {passive: true})

				document.getElementById(`info_event_details_link_${events[i]._id}`).addEventListener('click', () => {
					dispatch(showSelectedEventDetails(true));
				}, {passive: true}) 	
			}, {passive: true})
		}
	}

	const addMouseClickToMapMarkers = () => {
		for (let i = 0; i < markers.current.length; i++) {
			markers.current[i].addListener("click", () => {
				let newMap = gMap;
				newMap.setCenter(
					new window.google.maps.LatLng(
						Number(events[i].location.latitude), 
						Number(events[i].location.longitude)
					)
				);
				dispatch(receiveEventClicked(events[i]._id))
				setGMap(newMap)
				infoTiles.current[i].open({
					anchor: markers.current[i],
					map: gMap
				})
			}, {passive: true})
		}
	}

	const addInternalEventListenersToInfoContent = () => {
	}

	const resetLocationBasedOnGeolocation = () => {
		if (!geoLocationClicked) {
			if (userLocationCoords.current) {
				const locationMarker = new window.google.maps.Marker({
					position: {
						lat: Number(userLocationCoords.current.lat), 
						lng: Number(userLocationCoords.current.lng)
					},
					map: gMap, 
					icon: {
						url: blueIcon, 
						scaledSize: new window.google.maps.Size(64, 64)
					},
					animation: window.google.maps.Animation.DROP
				});
				let userLatLng = new window.google.maps.LatLng(userLocationCoords.current)
				infoWindow.setPosition(userLatLng);
				infoWindow.setContent("Your Approximate Location.")
				infoWindow.open({
					anchor: locationMarker,
					map: gMap 
				})

				const circle = new window.google.maps.Circle({
					map: gMap, 
					radius: 36,
					strokeColor: "#c4c4c4",
					strokeOpacity: 0.35,
					fillColor: '#4a80f5'
				})
				circle.bindTo('center', locationMarker, 'position');
				setGeoLocationClicked(true);
			}
		}
	}

	const requestNearbyLibraries = () => {
		if (gMap && !requestedLibraries) {
			let locationLng = gMap.center.lng();
			let locationLat = gMap.center.lat();
			let request = {
				location: new window.google.maps.LatLng({lat: locationLat, lng: locationLng}), 
				radius: '400',
				type: ['library']
			};
	
			let service = new window.google.maps.places.PlacesService(gMap);
			service.nearbySearch(request, placeLibraries);
			setRequestedLibraries(true);
		}
	}

// Initialize The Map
	useEffect(() => {
		const initialMap = new window.google.maps.Map(ref.current, {
			center: { lat: centerCoords.lat, lng: centerCoords.lng},
			zoom: zoomAmount,
			styles: stylesArray
		})
		// Creating the Geolocation Controls Button and Event Listener
		initialMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
		locationButton.addEventListener("click", findGeoLocation, {passive: true});
		setGMap(initialMap)
	}, []);

	useEffect(() => {
		nullAllMarkers();
		fillMarkersRefWithTodaysEvents();
		// Set InfoTiles Ref to array of empty InfoWindows the same length as markers.current. 
		infoTiles.current = markers.current.map(() => new window.google.maps.InfoWindow({ content: ""}));
		fillInfoTilesRefWithContent();
		addMouseClickToMapMarkers(); 
		addInternalEventListenersToInfoContent();
		resetLocationBasedOnGeolocation();
		requestNearbyLibraries();
	}, [gMap, events])
 
	return (
		<>
			<div id="map_container">
				<div id="map_wrapper">
					<div ref={ref} id="map" />
				</div>
			</div>
			
		</>
	)
}

export default GMap;