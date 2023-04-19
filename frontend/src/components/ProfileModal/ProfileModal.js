import './ProfileModal.css'
import { logout } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMyCreatedEvents, getMyJoinedEvents } from '../../store/events';
import MyCreatedEvents from '../MyCreatedEvents/MyCreatedEvents';
import { useState } from 'react';
import { selectedTab, setTabStatus } from '../../store/ui';
const ProfileModal = () => {
    const dispatch = useDispatch();
    const createdEvents = useSelector(getMyCreatedEvents);
    const joinedEvents = useSelector(getMyJoinedEvents);
    const requestedEvents = useSelector(state => state.session.user.requestedEvents);

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

    return (
        <div id='profile-modal-container'> 
            <div id='big-event-container'>
                <div id='myevents-create-container'>
                    <div id='events-tab'>
                        <div className={`myevents-header ${currentTab === "My Events" ? 'selected' : ''}`} onClick={selectMyEvents}>My Events</div>
                        <div className={`myevents-header ${currentTab === "Joined Events" ? 'selected' : ''}`} onClick={selectJoinedEvents}>Joined Events</div>
                        <div className={`myevents-header ${currentTab === "Requested Events" ? 'selected' : ''}`} onClick={selectRequestEvents}>Requested Events</div>
                    </div>
                    <div id='create-event-button'>
                        <i className="fa-solid fa-plus" id='plus-icon'></i>
                        Create Event</div>
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
                <div id='settings-button'>Profile Settings</div>
                <div id='logout-button' onClick={logoutUser}>Logout</div>
            </div>
        </div>
    )
}

export default ProfileModal;