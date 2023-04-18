import './ProfileModal.css'
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMyCreatedEvents } from '../../store/events';
import MyCreatedEvents from '../MyCreatedEvents/MyCreatedEvents';
const ProfileModal = () => {
    const dispatch = useDispatch();
    const events = useSelector(getMyCreatedEvents);

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
      }
    return (
        <div id='profile-modal-container'> 
            <div id='big-event-container'>
                <div id='myevents-create-container'>
                    <div id='myevents-header'>My Events</div>
                    <div id='create-event-button'>
                        <i className="fa-solid fa-plus" id='plus-icon'></i>
                        Create Event</div>
                    <div id='divider'></div>
                </div>

                <div id='events-holder'>
                    {
                        events.map(event => {
                            return <MyCreatedEvents event={event} key={event._id}/>
                        })
                    }
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