import './EventSidebar.css';

const EventSidebarItem = ({event}) => {

  return (
    <div className="event-sidebar-item">
      <span className="event-name">
        {event.name}
      </span>
      
      {/* <span className="event-description">
        {event.description || ''}
      </span> */}

      <span className="event-location">
        {event.location.name}
      </span>

      <div className="attendee-photos">
        {
          event.attendees.map(attendee => {
            return <img
              className='user-image attendee'
              src={
                attendee.profileImageUrl ||
                require('../NavBar/assets/cat.jpeg')
              }
              alt=''
            />
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
  )
}

export default EventSidebarItem;