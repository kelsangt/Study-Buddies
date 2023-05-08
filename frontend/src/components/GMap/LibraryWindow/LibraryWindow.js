import './LibraryWindow.css'

const LibraryWindow = ({library}) => {

	return (
		<>
			<div id="local_lib_name">{`${library}`}</div>
			<br></br>
			<div id="local_lib_create_event_wrapper">
				<div className="local_lib_create_event_link">Create A Session</div>
			</div>
		</>
	)
}

export default LibraryWindow;