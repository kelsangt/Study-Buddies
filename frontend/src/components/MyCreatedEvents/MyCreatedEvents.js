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

const MyCreatedEvents = ({event}) => {
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
            {(currentTab === "My Events") &&
            <div className='myevent-edit-holder'>
                <div onClick={showEditForm} id='myevent-edit-button'>Edit Event</div>
                {showEventEditModal && (
                    <CenterModal onClose={hideEditForm}>
                        <EventUpdateForm event={event} key={event._id}/>
                    </CenterModal>
                )}
            </div>
            }
            {(currentTab === "Joined Events") &&
            <div className='myevent-edit-holder'>
                <div onClick={handleLeave} id='myevent-edit-button'>Leave Event</div>
            </div>
            }

            {(currentTab === "Requested Events") &&
            <div className='myevent-edit-holder'>
                <div onClick={handleRequest} id='myevent-edit-button'>Cancel Request</div>
            </div>
            }

        </div>
    )
}

export default MyCreatedEvents;