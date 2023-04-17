import './InfoBoxInternal.css'

const InfoBoxInternal = ({event}) => {

	const subject = event.name;
	const host = "Justin"
	const date = "April 23, 2023"
	return (
		<div id="infobox_internal_wrapper">
			<div id="infobox_internal_title_wrapper">
				<div id="infobox_internal_title">{subject} Study Session</div>
			</div>
			<div id="infobox_internal_text">Hosted By: {event.creator.username}</div>
			<div id="infobox_internal_start_date">Occurs on: {date}</div>
			<div id="infobox_internal_membersjoined">3/4 Buddies</div>
			<div id="infobox_internal_bottom_row_wrapper">
				<div id="infobox_internal_join_session_wrapper">
					<div id="infobox_internal_join_session">Join Session</div>
				</div>
				<div id="infobox_internal_image">
					<div id="infobox_internal_image_text">?</div>
				</div>
			</div>

		</div>
	)
}

export default InfoBoxInternal;