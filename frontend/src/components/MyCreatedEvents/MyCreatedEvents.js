import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NameToolTip } from '../../context/Modal';
import './MyCreatedEvents.css';
import { selectedTab } from '../../store/ui';
import { CenterModal } from '../../context/Modal';
import { setModalStatus } from '../../store/ui';
import EventUpdateForm from '../EventUpdateForm/EventUpdateForm';
import { deleteEvent } from '../../store/events';
import { deleteRequest } from '../../store/events';
import { showSelectedEventDetails } from '../../store/ui';
import { receiveEventClicked } from '../../store/ui';
import { hideNotification } from '../../store/notifications';

const MyCreatedEvents = ({event, notificationType}) => {
    const [showModal, setShowModal] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [currentModal, setCurrentModal] = useState(null);
    const [showEventEditModal, setShowEventEditModal] = useState(false);
    const currentTab = useSelector(selectedTab);
    const count = event.attendees.length
    const dispatch = useDispatch();

    const showEditForm = (e) => {
        e.preventDefault();
        setShowEventEditModal(true);
        const sideModal2 = document.getElementById('profile-modal-container');
        sideModal2.style.display = 'none';
    }

    const hideEditForm = (e) => {
        e.preventDefault();
        setShowEventEditModal(false);
        dispatch(setModalStatus(true));
        const sideModal2 = document.getElementById('profile-modal-container');
        sideModal2.style.display = 'flex';
    }
    const handleLeave = (e) => {
        e.preventDefault();
        dispatch(deleteEvent(event._id))
    }

    const handleRequest = (e) => {
        e.preventDefault();
        dispatch(deleteRequest(event._id))
    }

    const handleShow = (e) => {
        e.preventDefault();
        dispatch(receiveEventClicked(event._id));
        dispatch(showSelectedEventDetails(true));
    }

    const handleDeleteNotification = (e) => {
        e.preventDefault();
        dispatch(hideNotification({
            notificationType,
            eventId: event._id
        }))
    }

    return (
        <div className='individual-event-holder'>
            <div className="myevent-name">
                {event.name}
            </div>
      
            {/* <div className="event-description">
                {event.description || ''}
            </div> */}

            <div className="myevent-location">
                {event.location.name}
            </div>

            <div className="myattendee-count">
                # of Attendees: {count}
            </div>

            <div className="time">
                {new Date(event.startTime).toLocaleDateString("en-us").split("T")[0]} 
            </div>

            <div className="time">
                {/* {new Date(event.startTime).toLocaleDateString("en-us").split("T")[0]} 
                {` `} */}
                {new Date(event.startTime).toLocaleDateString('en-us', {hour: "numeric", minute: "numeric", hour12: true}).split(', ')[1]} 
                {` - `}  
                {new Date(event.endTime).toLocaleDateString('en-us', {hour: "numeric", minute: "numeric", hour12: true}).split(', ')[1]}
            </div>
            
            {(currentTab === "My Sessions") &&
            <div className='myevent-edit-holder'>
                <div className="myevent-options-holder">
                    <div onClick={showEditForm} id='myevent-edit-button'>Edit Session</div>
                    <div onClick={handleLeave} id='myevent-edit-button'>Delete Session</div>
                </div>
                {showEventEditModal && (
                    <CenterModal onClose={hideEditForm}>
                        <EventUpdateForm event={event} key={event._id}/>
                    </CenterModal>
                )}
            </div>
            }
            {(currentTab === "Joined Sessions") &&
            <div className='myevent-edit-holder'>
                <div onClick={handleLeave} id='myevent-edit-button'>Leave Session</div>
            </div>
            }

            {(currentTab === "Requested Sessions") &&
            <div className='myevent-edit-holder'>
                <div onClick={handleRequest} id='myevent-edit-button'>Cancel Request</div>
            </div>
            }

            {(currentTab === "Notifications") &&
            <div className='myevent-edit-holder'>
            <div className="myevent-options-holder">
                <div onClick={handleShow} id='myevent-edit-button'>Show Details</div>
                <div onClick={handleDeleteNotification} id='myevent-edit-button'>Mark as Read</div>
            </div>
            </div>
            }

        </div>
    )
}

export default MyCreatedEvents;