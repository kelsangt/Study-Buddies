import { createEventRequest } from '../../store/events';
import './EventShow.css';
import { useDispatch, useSelector } from 'react-redux';

const EventShow = ({event}) => {
  const sessionUser = useSelector(state => state.session.user)
  const requestedStatus = useSelector(state => !!state.session.user.requestedEvents[event._id])
  const dispatch = useDispatch();

  const handleRequest = (e) => {
    e.preventDefault();
    dispatch(createEventRequest(event._id))
  }

  // console.log(event)

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

      <span className="show-header">Creator</span>
      <div className="event-creator">
        <img 
          className="user-image show"
          src={
            event.creator.profileImageUrl ||
            require('../NavBar/assets/defaultprofile.png')
          }
          alt=''
        />
        <span className="creator-username">
          {event.creator.username}
        </span>
      </div>

      <span className="show-header">Attendees</span>
      <div className="attendee-photos">
        {
          event.attendees.map(attendee => {
            return (
              <div className="attendee-info" key={`${attendee._id} ${event._id}`}>
                <img
                  className='user-image show'
                  src={
                    attendee.profileImageUrl ||
                    require('../NavBar/assets/defaultprofile.png')
                  }
                  alt=''
                />
                <span>{attendee.username}</span>
              </div>
            )
          })
        }
      </div>

      {
        !(event.creator._id === sessionUser._id) &&
        !event.attendees.map(attendee => attendee._id).includes(sessionUser._id)
          ? <div className="button-container">
              <button 
                className="request-button" 
                onClick={handleRequest}
                disabled={requestedStatus}
              > Request to Join </button>
            </div>
          : null
      }
    </div>
  )
}

export default EventShow;