import {useState, useRef, useEffect} from 'react';
import './GMap.css';
import Marker from './marker/Marker';
import {renderToString} from 'react-dom/server'

const GMap = ({center, zoom}) => {
	const [map, setMap] = useState();
	const centerCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 16;
	const ref = useRef();
	const markers = useRef({});
	const infoTitles = useRef({});
	
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
			ariaLabel: "Testing",
			content: ""
		})

		markers.current.addListener("mouseover", () => {
			const content = renderToString(<Marker />)
			infoTitles.current.open({
				anchor: markers.current,
				map
			})
			infoTitles.current.setContent(content);
		})
	}, [map])

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