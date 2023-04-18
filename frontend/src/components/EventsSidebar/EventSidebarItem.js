import { useState } from 'react';
import './EventSidebar.css';
import { CenterModal, NameToolTip } from '../../context/Modal';
import EventShow from '../EventShow';

const EventSidebarItem = ({event}) => {
  const [showModal, setShowModal] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentModal, setCurrentModal] = useState(null);
  const [showEventInfoModal, setShowEventInfoModal] = useState(false);

  const showHandler = (id) => (e) => {
    e.preventDefault();

    setCurrentModal(id);
    setShowModal(true);

    const rect = e.target.getBoundingClientRect();

    let x = rect.x - 40;
    if (x < 10) x = 1;

    setLeft(x)
    setTop(rect.y - 20)
  }

  const leaveHandler = (e) => {
    e.preventDefault();
    setCurrentModal(null);
    setShowModal(false);
  }

  return (
    <>
      <div 
        className="event-sidebar-item"
        onClick={() => setShowEventInfoModal(true)}
      >
        <span className="event-name">
          {event.name}
        </span>

        <span className="event-location">
          {event.location.name}
        </span>

        <div className="attendee-photos">
          {
            event.attendees.map(attendee => {
              return (
                <div key={`${attendee._id} ${event._id}`}>
                  <img
                    className='user-image attendee'
                    src={
                      attendee.profileImageUrl ||
                      require('../NavBar/assets/cat.jpeg')
                    }
                    alt=''
                    onMouseEnter={showHandler(attendee._id)}
                    onMouseLeave={leaveHandler}
                  />
      
                  {showModal && currentModal === attendee._id && (
                    <NameToolTip top={top} left={left} onClose={() => setShowModal(false)}>
                      <span className="tooltip">
                        { attendee.username }
                      </span>
                    </NameToolTip>
                  )}
                </div>
              )
            })
          }
        </div>

        <div className="event-creator">
          <span className="creator-username">
            {event.creator.username}
          </span>
          <img 
            className="user-image"
            src={
              event.creator.profileImageUrl ||
              require('../NavBar/assets/cat.jpeg')
            }
            alt=''
          />
        </div>
      </div>

      {showEventInfoModal && (
        <CenterModal onClose={() => setShowEventInfoModal(false)}>
          <EventShow event={event} />
        </CenterModal>
      )}
    </>
  )
}

export default EventSidebarItem;