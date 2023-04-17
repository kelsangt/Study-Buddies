import {useState, useRef, useEffect} from 'react';
import './GMap.css';
import benches from './bench_data';
import Marker from './marker/Marker';
 

const GMap = ({center, zoom}) => {
	const [map, setMap] = useState();
	const centerCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 18;
	const ref = useRef();
	const markers = useRef({});
	

	useEffect(() => {

		setMap(
			new window.google.maps.Map(ref.current, {
				center: { lat: centerCoords.lat, lng: centerCoords.lng},
				zoom: zoomAmount
			})
		);
	}, []);

	useEffect(() => {
		markers.current = new window.google.maps.Marker({
			position: {lat: 40.73630, lng: -73.99379},
			map: map, 
			title: "App Academy",
			icon: <Marker />,
			label: "App Academy"
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