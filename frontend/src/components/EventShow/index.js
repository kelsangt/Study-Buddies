import './EventShow.css';

const EventShow = ({event}) => {
  return (
    <div className="event-show">
      <span className="event-name">
        {event.name}
      </span>

      <span className="event-location">
        {event.location.name}
      </span>

      <span className="event-description">
        {event.description}
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
                />
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
  )
}

export default EventShow;