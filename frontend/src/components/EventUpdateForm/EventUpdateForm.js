import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, deleteAttendee, updateRequester } from '../../store/events';
import { updateEvent } from '../../store/events';
import { getLocations } from '../../store/locations';
import './EventUpdateForm.css'

function EventUpdateForm ({event}) {
    const locations = useSelector(getLocations);

    let selectedIndex = null;
    locations.forEach((loc, idx) => {
      if (loc.name === event.location.name) selectedIndex = idx
    })

    const currentAttendees = event.attendees
    const requestedAttendees = event.requesters
    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [locationIndex, setLocationIndex] = useState(selectedIndex);
    const [startTimeInitial, setStartTimeInitial] = useState(event.startTime.split('T')[1].slice(0, 5));
    const [endTimeInitial, setEndTimeInitial] = useState(event.endTime.split('T')[1].slice(0, 5));
    const [date, setDate] = useState(event.endTime.split('T')[0]);

  // debugger
    // const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();
  
    const update = field => {
      let setState;
  
      switch (field) {
        case 'Date':
          setState = setDate;
          break;
        case 'Name':
          setState = setName;
          break;
        case 'Description':
          setState = setDescription;
          break;
        case 'Location':
          setState = setLocationIndex;
          break;
        case 'Start Time':
          setState = setStartTimeInitial;
          break;
        case 'End Time':
          setState = setEndTimeInitial;
          break;
        default:
          throw Error('Unknown field in Event Create Form');
      }

      return e => setState(e.currentTarget.value);
    }

    const handleEventCreate = e => {
        e.preventDefault();

        const [year, month, day] = date.split('-');
        const [startHour, startMin] = startTimeInitial.split(':');
        const [endHour, endMin] = endTimeInitial.split(':');
        const startTime = new Date(year, parseInt(month) - 1, day, startHour, startMin);
        const endTime = new Date(year, parseInt(month) - 1, day, endHour, endMin);

        if (startTime > endTime) {
          console.log("time error")
        }

        const location = locations[locationIndex];

        const updatedEvent = {
            _id: event._id,
            name,
            description,
            location,
            startTime: startTime,
            endTime: endTime
        };

        dispatch(updateEvent(updatedEvent));
    }
  
    // accept deny
    const handleKick = (eventId, attendeeId) => () => {
      // debugger
      dispatch(deleteAttendee(eventId, attendeeId))
    }
    const handleAccept = (eventId, attendeeId, accept) => () => {
      dispatch(updateRequester(eventId, attendeeId, accept))
    }
    const handleReject = (eventId, attendeeId, deny) => () => {
      dispatch(updateRequester(eventId, attendeeId, deny))
    }
  
    const getMinDate = () => {
      const today = new Date().toLocaleDateString("en-us", {year: "numeric", month: "2-digit", day: "2-digit"})
      const [month, day, year] = today.split('/');
      return `${year}-${month}-${day}`
    }

    return (
      <div id="mainEventUpdateDiv">
        <div id="eventUpdateFormDiv">
          <h2 id="UpdateSessionH2">Edit Session</h2>
          <form className="signup-form" onSubmit={handleEventCreate}>
            {/* <div className="errors">{errors?.email}</div> */}
            <label className="signupLabel">
              <span id="emailSpan">Name</span>
              <input className="inputField" type="text"
                value={name}
                onChange={update('Name')}
                placeholder="Name"
              />
            </label>
            {/* <div className="errors">{errors?.username}</div> */}
            <label className="signupLabel">
              <span id="usernameSpan">Description</span>
              <input className="inputField" type="text"
                value={description}
                onChange={update('Description')}
                placeholder="Description"
              />
            </label>
  
            {/* <div className="errors">{errors?.firstName}</div> */}
            <label className="signupLabel">
              <span id="firstNameSpan">Location</span>
             
              <select className="inputField" id="selectLocation" onChange={update('Location')} value={locationIndex}>
                <option disabled selected value>Select a Location</option>
                {locations.map((location, index)=>{
                    return (
                        <option 
                          key={index} 
                          value={index}
                        >
                            {location.name}
                        </option>
                    )
                })}
              </select>

            </label>
            <label className="signupLabel">
              <span id="passwordSpan">Date</span>
              <input className="inputField" type="date"
                value={date}
                onChange={update('Date')}
                placeholder="Date"
                min={getMinDate()}
              />
            </label>
            {/* <div className="errors">{errors?.lastName}</div> */}
            <label className="signupLabel">
              <span id="lastNameSpan">Start Time</span>
              <input className="inputField" type="time"
                value={startTimeInitial}
                onChange={update('Start Time')}
                placeholder="Start Time"
              />
            </label>
  
  
            {/* <div className="errors">{errors?.school}</div> */}
            <label className="signupLabel">
              <span id="schoolSpan">End Time</span>
              <input className="inputField" type="time"
                value={endTimeInitial}
                onChange={update('End Time')}
                placeholder="End Time"
              />
            </label>
  
            {/* <div className="errors">{errors?.password}</div> */}
            {/* <div className="errors">
              {password !== password2 && 'Confirm Password field must match'}
            </div> */}
            <label className="submitButton">
              <input className="submitInput"
                type="submit"
                value="Confirm Changes"
                // disabled={!name || !description || !location }
              />
            </label>
          </form>
            
        </div>

        <div id='all-requesters-container'>

          <div id='current-requesters-container'>
            <div id='attendee-title'>Current Attendees</div>
            {
              currentAttendees.map((attendee) => {
                let attendeeId = attendee._id
                let eventId = event._id
                  return (
                    <div className='individual-attendee-container'>
                      <div>{attendee.username}</div>
                      <div className='attendee-options' id='reject-button' onClick={handleKick(eventId, attendeeId)}>Kick</div>
                    </div>
                  )
              })
            }
          </div>

          <div id='pending-requesters-container'>
            <div id='attendee-title'>Pending Attendee Requests</div>
            {
              requestedAttendees.map((attendee) => {
                let attendeeId = attendee._id
                let eventId = event._id
                let accept = 'accept'
                let deny = 'deny'
                  return (
                    <div className='individual-attendee-container'>
                      <div>{attendee.username}</div>
                      <div className='attendee-options' id='accept-button' onClick={handleAccept(eventId, attendeeId, accept)}>Accept</div>
                      <div className='attendee-options' id='reject-button' onClick={handleReject(eventId, attendeeId, deny)}>Reject</div>
                    </div>
                  )
              })
            }
          </div>
        </div>

      </div>
    );
  }

export default EventUpdateForm;