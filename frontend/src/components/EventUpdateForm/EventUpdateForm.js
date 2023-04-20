import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, deleteAttendee, updateRequester } from '../../store/events';
import { updateEvent } from '../../store/events';
import { getLocations } from '../../store/locations';
import './EventUpdateForm.css'

function EventUpdateForm ({event}) {
    const currentAttendees = event.attendees
    const requestedAttendees = event.requesters
    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    // const [location, setLocation] = useState(event.location.name);
    const [locationIndex, setLocationIndex] = useState("");
    const [startTimeInitial, setStartTimeInitial] = useState(event.startTime);
    const [endTimeInitial, setEndTimeInitial] = useState(event.endTime);
    const [date, setDate] = useState(event.startTime.split('T')[0]);

    const locations = useSelector(getLocations);
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

        // const [year, month, day] = date.split('-');
        // const [startHour, startMin] = startTimeInitial.split(':');
        // const [endHour, endMin] = endTimeInitial.split(':');
        // const startTime = new Date(year, parseInt(month) - 1, day, startHour, startMin);
        // const endTime = new Date(year, parseInt(month) - 1, day, endHour, endMin);

        const location = locations[locationIndex];

        // const event = {
        //     name,
        //     description,
        //     location,
        //     startTimeInitial,
        //     endTimeInitial
        // };
        dispatch(updateEvent({_id: event._id,
                              name,
                              description, 
                              location, 
                              startTime: startTimeInitial, 
                              endTime: endTimeInitial, 
                              date
                            }));
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
             
              <select className="inputField" id="selectLocation" onChange={update('Location')}>
                <option disabled selected value>Select a Location</option>
                {locations.map((location, index)=>{
                    return (
                        <option key={index} value={index}>
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
              />
            </label>
            {/* <div className="errors">{errors?.lastName}</div> */}
            <label className="signupLabel">
              <span id="lastNameSpan">Start Time</span>
              <input className="inputField" type="time"
                value={startTimeInitial.split('T')[1].slice(0,5)}
                onChange={update('Start Time')}
                placeholder="Start Time"
              />
            </label>
  
  
            {/* <div className="errors">{errors?.school}</div> */}
            <label className="signupLabel">
              <span id="schoolSpan">End Time</span>
              <input className="inputField" type="time"
                value={endTimeInitial.split('T')[1].slice(0,5)}
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