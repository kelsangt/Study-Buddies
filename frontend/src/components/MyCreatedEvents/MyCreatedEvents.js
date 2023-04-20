import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NameToolTip } from '../../context/Modal';
import './MyCreatedEvents.css';
import { selectedTab } from '../../store/ui';
import { CenterModal } from '../../context/Modal';
import { setModalStatus } from '../../store/ui';
import EventUpdateForm from '../EventUpdateForm/EventUpdateForm';

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
        </div>
    )
}

export default MyCreatedEvents;