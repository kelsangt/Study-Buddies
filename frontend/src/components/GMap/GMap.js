import {useState, useRef, useEffect} from 'react';
import './GMap.css';
import {renderToString} from 'react-dom/server'
import InfoBoxInternal from './marker/InfoBoxInternal';
import NavBar from '../NavBar/NavBar';
import { getEvents } from '../../store/events';
import { useSelector } from 'react-redux';
import { getLocations } from '../../store/locations';


const GMap = ({center, zoom}) => {
	const [map, setMap] = useState();
	const centerCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 16;
	const ref = useRef();
	const markers = useRef([]);
	const infoTiles = useRef([]);
	const events = useSelector(getEvents);
	const image = "../icon.png";

	const stylesArray = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
    }
];

	useEffect(() => {
		setMap(
			new window.google.maps.Map(ref.current, {
				center: { lat: centerCoords.lat, lng: centerCoords.lng},
				zoom: zoomAmount,
				styles: stylesArray
			})
		)
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
	}, [map, events])

	return (
		<>
			<NavBar />
			<div id="map_container">
				<div id="map_wrapper">
					<div ref={ref} id="map" />
				</div>
			</div>
		</>
	)
}

export default GMap;