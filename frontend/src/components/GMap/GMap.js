import {useState, useRef, useEffect} from 'react';
import './GMap.css';
import {renderToString} from 'react-dom/server'
import InfoBoxInternal from './marker/InfoBoxInternal';
import NavBar from '../NavBar/NavBar';
import { getEvents } from '../../store/events';
import { useSelector } from 'react-redux';


const GMap = ({center, zoom}) => {
	const [map, setMap] = useState();
	const centerCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 16;
	const ref = useRef();
	const markers = useRef({});
	const infoTitles = useRef({});
	const events = useSelector(getEvents);
	
	const image = "../icon.png";
	const content = "This is a Test";

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
		markers.current = new window.google.maps.Marker({
			position: {lat: 40.73630, lng: -73.99379},
			map: map, 
			title: "App Academy",
			icon: {
				url: image,
				scaledSize: new window.google.maps.Size(64, 64)
			},
		})

		infoTitles.current = new window.google.maps.InfoWindow({
			content: "",

		})

		markers.current.addListener("mouseover", () => {
				const content = renderToString(
				<div id="InfoBoxInternal_wrapper"><InfoBoxInternal event={events[0]} /> </div>)
				infoTitles.current.open({
					anchor: markers.current,
					map
				})
				infoTitles.current.setContent(content);
			})
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