import { useEffect } from 'react';
import './InfoBoxInternal.css'
import { useDispatch } from 'react-redux';

const InfoBoxInternal = ({event}) => {
	const subject = event?.name; 
	const startDate = new Date(event?.startTime);

	// Date Variable
	const fullDate = startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
	// Time Variable 
	const eventTime = startDate.toLocaleTimeString('en-US');

	const capitalizedTitle = (title) => {
		if (title) {
			return title.split(" ").map((ele) => {
				return ele[0].toUpperCase() + ele.slice(1);
			}).join(" ");
		}
	}

	//{eventMonth} {eventDay}, {eventYear}
	return (
		<div id="infobox_internal_wrapper">
			<div id="infobox_internal_title_wrapper">
				<div id="infobox_internal_title">{capitalizedTitle(subject)} Study Session</div>
			</div>
			<div id="infobox_internal_text">Hosted By: {event.creator.username} </div>
			<div id="infobox_internal_start_date">Occurs on: {fullDate}</div>
			<div id="infobox_internal_start_time">Begins at: {eventTime} </div>
			<div id="infobox_internal_membersjoined">{event.attendees.length + 1} Current Buddies</div>
			<div id="infobox_internal_bottom_row_wrapper">
				<div id="infobox_internal_join_session_wrapper">
					<div id="infobox_internal_session_details">Details</div>
				</div>
				<div id="infobox_internal_image">
					<div id="infobox_internal_image_text">{event.creator.username[0]}</div>
				</div>
			</div>

		</div>
	)
}

export default InfoBoxInternal;