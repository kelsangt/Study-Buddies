import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NameToolTip } from '../../context/Modal';
import './MyCreatedEvents.css';
import { selectedTab } from '../../store/ui';

const MyCreatedEvents = ({event}) => {
    const [showModal, setShowModal] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [currentModal, setCurrentModal] = useState(null);
    const currentTab = useSelector(selectedTab);
    const count = event.attendees.length

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
                <div id='myevent-edit-button'>Edit Event</div>
            </div>
            }
        </div>
    )
}

export default MyCreatedEvents;