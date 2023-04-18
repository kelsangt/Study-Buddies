import './ProfileModal.css'
const ProfileModal = () => {

    return (
        <div id='profile-modal-container'> 
            <div id='big-event-container'>
                <div id='myevents-create-container'>
                    <div id='myevents-header'>My Events</div>
                    <div id='create-event-button'>Create Events button</div>
                </div>

                <div id='events-holder'>Div 2
                    <div className='individual-event-holder'>Event 1 example</div>
                    <div className='individual-event-holder'>Event 2 example</div>
                </div>
            </div>

            <div id='profile-modal-footer'>Div 3
                <div id='settings-button'>Settings</div>
                <div id='logout-button'>Logout</div>
            </div>
        </div>
    )
}

export default ProfileModal;