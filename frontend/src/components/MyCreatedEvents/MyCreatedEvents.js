import { useState } from 'react';
import { NameToolTip } from '../../context/Modal';
import './MyCreatedEvents.css';

const MyCreatedEvents = ({event}) => {
    const [showModal, setShowModal] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [currentModal, setCurrentModal] = useState(null);

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
        </div>
    )
}

export default MyCreatedEvents;