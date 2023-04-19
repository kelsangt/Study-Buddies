import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent } from '../../store/events';
import { getLocations } from '../../store/locations';

function EventCreateForm () {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startTimeInitial, setStartTimeInitial] = useState('');
    const [endTimeInitial, setEndTimeInitial] = useState('');
    const [date, setDate] = useState('');

    const locations = useSelector(getLocations);
  
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
          setState = setLocation;
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

        const startTime = date + startTimeInitial;
        const endTime = date + endTimeInitial;

        const event = {
            name,
            description,
            location,
            startTime,
            endTime,
            date
        };
        dispatch(createEvent(event));
    }
  
  
    return (
      <div id="mainEventCreateDiv">
        <div id="eventCreateFormDiv">
          <h2 id="createSessionH2">Create Session</h2>
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
              <input className="inputField" type="text"
                value={location}
                onChange={update('Location')}
                placeholder="Location"
              />

              <select id="selectLocation">
                {locations.map((location)=>{
                    return (
                        <option key={location.id} value={location}>
                            {location.name}
                        </option>
                    )
                })}
              </select>

            </label>
            <label class="signupLabel">
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
                value={startTimeInitial}
                onChange={update('Start Time')}
                placeholder="Start Time"
              />
            </label>
  
  
            {/* <div className="errors">{errors?.school}</div> */}
            <label class="signupLabel">
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
            <label class="submitButton">
              <input className="submitInput"
                type="submit"
                value="Create Session"
                disabled={!name || !description || !location || !startTimeInitial || !endTimeInitial}
              />
            </label>
          </form>
            
        </div>
      </div>
    );
  }

export default EventCreateForm;