import './ProfileModal.css'
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMyCreatedEvents, getMyJoinedEvents, getMyRequestedEvents } from '../../store/events';
import MyCreatedEvents from '../MyCreatedEvents/MyCreatedEvents';
import { useState } from 'react';
import { selectedTab, setModalStatus, setTabStatus } from '../../store/ui';
import { CenterModal } from '../../context/Modal';
import EventCreateForm from '../EventCreateForm/EventCreateForm';
import { Link } from 'react-router-dom';
import { getNotifications, hideAllNotifications } from '../../store/notifications';

const ProfileModal = () => {
    const dispatch = useDispatch();
    const createdEvents = useSelector(getMyCreatedEvents);
    const joinedEvents = useSelector(getMyJoinedEvents);
    const requestedEvents = useSelector(getMyRequestedEvents);
    const notifications = useSelector(getNotifications);
    const [showEventCreateModal, setShowEventCreateModal] = useState(false);
    const tab = useSelector(selectedTab)

    const currentTab = useSelector(selectedTab);
    let myEventTab;
    let joinedEventTab;
    let requestedEventTab;
    let notificationTab;
    if (currentTab === 'My Sessions') {
        myEventTab = true
    } else if (currentTab === 'Joined Sessions') {
        joinedEventTab = true
    } else if (currentTab === 'Requested Sessions') {
        requestedEventTab = true
    } else {
        notificationTab = true
    }

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }
    const selectMyEvents = () => {
        dispatch(setTabStatus("My Sessions"))
    }

    const selectJoinedEvents = () => {
        dispatch(setTabStatus("Joined Sessions"))
    }
    const selectRequestEvents = () => {
        dispatch(setTabStatus("Requested Sessions"))
    }
    const selectNotifications = () => {
        dispatch(setTabStatus("Notifications"))
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
        setTimeout(()=>{
        dispatch(setModalStatus(false))
      }, 500)
    }

    const hideAll = (e) => {
        e.preventDefault();
        dispatch(hideAllNotifications());
    }

    return (
        <div id='profile-modal-container'> 
            <div id='big-event-container'>
                <div id='myevents-create-container'>
                    <div id='events-tab'>
                        <div id='close-caret' onClick={closeModal}><i className="fa-solid fa-caret-right"></i></div>
                        <div className={`myevents-header ${currentTab === "My Sessions" ? 'selected' : ''}`} onClick={selectMyEvents}>My Sessions</div>
                        <div className={`myevents-header ${currentTab === "Joined Sessions" ? 'selected' : ''}`} onClick={selectJoinedEvents}>Joined Sessions</div>
                        <div className={`myevents-header ${currentTab === "Requested Sessions" ? 'selected' : ''}`} onClick={selectRequestEvents}>Requested Sessions</div>
                        <div className={`myevents-header ${currentTab === "Notifications" ? 'selected' : ''}`} onClick={selectNotifications}>Upcoming Sessions</div>
                    </div>
                    
                    {
                        tab === "My Sessions" &&
                        <div 
                            id='create-event-button'
                            onClick={showCreateForm}
                        >
                            <i className="fa-solid fa-plus" id='plus-icon'></i>
                            Create Session
                        </div>
                    }

                    {
                        tab === "Notifications" &&
                        <div 
                            id='create-event-button'
                            onClick={hideAll}
                        >
                            Mark All as Read
                        </div>
                    }

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

                    {
                        notificationTab &&
                        Object.keys(notifications).map(timeNotification => {
                            const notificationItems = Object.values(notifications[timeNotification]).filter(el => el);

                            return (
                                notificationItems.length
                                ? <div key={timeNotification}>
                                    <span className="notification-time">
                                        {
                                            timeNotification === "<1 hour"
                                                ? "About an hour until session starts"
                                                : timeNotification === "6 hours"
                                                    ? "About 6 hours until session starts"
                                                    : "About 12 hours until session starts"
                                        }
                                    </span>
                                    {
                                        notificationItems.map(event => {
                                            return <MyCreatedEvents event={event} notificationType={timeNotification} key={event._id}/>
                                        })
                                    }
                                </div>
                                : null
                            )
                        })
                    }
                </div>
            </div>

            <div id='profile-modal-footer'>
                {/* <div id='divider'></div> */}
                
                <Link style={{ textDecoration: 'none' }} to={'/settings'}>
                    <div id='settings-button'>Profile Settings</div>
                </Link>

                <div id='logout-button' onClick={logoutUser}>Logout</div>
            </div>
        </div>
    )
}

export default ProfileModal;