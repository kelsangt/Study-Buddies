import './ProfileModal.css'
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMyCreatedEvents, getMyJoinedEvents } from '../../store/events';
import MyCreatedEvents from '../MyCreatedEvents/MyCreatedEvents';
import { useState } from 'react';
import { selectedTab, setModalStatus, setTabStatus } from '../../store/ui';
import { CenterModal } from '../../context/Modal';
import EventCreateForm from '../EventCreateForm/EventCreateForm';
import { Link } from 'react-router-dom';
const ProfileModal = () => {
    const dispatch = useDispatch();
    const createdEvents = useSelector(getMyCreatedEvents);
    const joinedEvents = useSelector(getMyJoinedEvents);
    const requestedEvents = useSelector(state => state.session.user.requestedEvents);
    const [showEventCreateModal, setShowEventCreateModal] = useState(false);

    const currentTab = useSelector(selectedTab);
    let myEventTab;
    let joinedEventTab;
    let requestedEventTab;
    if (currentTab === 'My Events') {
        myEventTab = true
    } else if (currentTab === 'Joined Events') {
        joinedEventTab = true
    } else {
        requestedEventTab = true
    }

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }
    const selectMyEvents = () => {
        dispatch(setTabStatus("My Events"))
    }

    const selectJoinedEvents = () => {
        dispatch(setTabStatus("Joined Events"))
    }
    const selectRequestEvents = () => {
        dispatch(setTabStatus("Requested Events"))
    }

    const showCreateForm = (e) => {
        e.preventDefault();
        setShowEventCreateModal(true);
        const sideModal = document.getElementById('profile-modal-container');
        sideModal.style.display = 'none';
    }

    const hideCreateForm = (e) => {
        e.preventDefault();
        setShowEventCreateModal(false);
        dispatch(setModalStatus(true));
        const sideModal = document.getElementById('profile-modal-container');
        sideModal.style.display = 'flex';
    }

    const closeModal = () => {
        const modal = document.getElementById('profile-modal-container')
        modal.classList.add('slideout')
        console.log(modal)
        setTimeout(()=>{
        dispatch(setModalStatus(false))
      }, 500)
    }

    return (
        <div id='profile-modal-container'> 
            <div id='big-event-container'>
                <div id='myevents-create-container'>
                    <div id='events-tab'>
                        <div id='close-caret' onClick={closeModal}><i className="fa-solid fa-caret-right"></i></div>
                        <div className={`myevents-header ${currentTab === "My Events" ? 'selected' : ''}`} onClick={selectMyEvents}>My Events</div>
                        <div className={`myevents-header ${currentTab === "Joined Events" ? 'selected' : ''}`} onClick={selectJoinedEvents}>Joined Events</div>
                        <div className={`myevents-header ${currentTab === "Requested Events" ? 'selected' : ''}`} onClick={selectRequestEvents}>Requested Events</div>
                    </div>
                    <div 
                        id='create-event-button'
                        onClick={showCreateForm}
                    >
                        <i className="fa-solid fa-plus" id='plus-icon'></i>
                        Create Event
                    </div>
                    {showEventCreateModal && (
                        <CenterModal onClose={hideCreateForm}>
                            <EventCreateForm />
                        </CenterModal>
                    )}
                </div>

                <div id='events-holder'>
                    {
                        myEventTab &&
                        createdEvents.map(event => {
                            return <MyCreatedEvents event={event} key={event._id}/>
                        })
                    }
                    {
                        joinedEventTab &&
                        joinedEvents.map(event => {
                            return <MyCreatedEvents event={event} key={event._id}/>
                        })
                    }

                    {
                        requestedEventTab &&
                        requestedEvents.map(event => {
                            return <MyCreatedEvents event={event} key={event._id}/>
                        })
                    }
                </div>
            </div>

            <div id='profile-modal-footer'>
                <div id='divider'></div>
                
                <Link style={{ textDecoration: 'none' }} to={'/settings'}>
                    <div id='settings-button'>Profile Settings</div>
                </Link>

                <div id='logout-button' onClick={logoutUser}>Logout</div>
            </div>
        </div>
    )
}

export default ProfileModal;