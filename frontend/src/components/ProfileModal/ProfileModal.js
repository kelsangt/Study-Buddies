import './ProfileModal.css'
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';

const ProfileModal = () => {
    const dispatch = useDispatch();
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
      }
    return (
        <div id='profile-modal-container'> 
            <div id='big-event-container'>
                <div id='myevents-create-container'>
                    <div id='myevents-header'>My Events</div>
                    <div id='create-event-button'>Create Events button</div>
                    <div id='divider'></div>
                </div>

                <div id='events-holder'>
                    <div className='individual-event-holder'>Event 1 example</div>
                    <div className='individual-event-holder'>Event 2 example</div>
                    <div className='individual-event-holder'>Event 3 example</div>
                    <div className='individual-event-holder'>Event 4 example</div>
                    <div className='individual-event-holder'>Event 5 example</div>
                    <div className='individual-event-holder'>Event 6 example</div>
                </div>
            </div>

            <div id='profile-modal-footer'>
                <div id='divider'></div>
                <div id='settings-button'>Profile Settings</div>
                <div id='logout-button' onClick={logoutUser}>Logout</div>
            </div>
        </div>
    )
}

export default ProfileModal;