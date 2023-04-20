import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent } from '../../store/events';
import { getLocations } from '../../store/locations';
import './EventCreateForm.css'

function EventCreateForm () {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [locationIndex, setLocationIndex] = useState('');
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

        console.log(location)

        const event = {
            name,
            description,
            location,
            startTime: startTime,
            endTime: endTime
        };
        dispatch(createEvent(event));
    }

    return (
      <div id="mainEventCreateDiv">
        <div id="eventCreateFormDiv">
          <h2 id="createSessionH2">Create a Session</h2>
          <form className="event-create-form" onSubmit={handleEventCreate}>
            {/* <div className="errors">{errors?.email}</div> */}
            <label className="eventCreateLabel">
              <span className="eventCreateFormSpan">Name</span>
              <input className="inputField" type="text"
                value={name}
                onChange={update('Name')}
                placeholder="Name"
              />
            </label>
            {/* <div className="errors">{errors?.username}</div> */}
            <label className="eventCreateLabel">
              <span className="eventCreateFormSpan">Description</span>
              <input className="inputField" type="text"
                value={description}
                onChange={update('Description')}
                placeholder="Description"
              />
            </label>
  
            {/* <div className="errors">{errors?.firstName}</div> */}
            <label className="eventCreateLabel">
              <span className="eventCreateFormSpan">Location</span>
             
              <select className="inputField" id="selectLocation" onChange={update('Location')}>
                <option disabled selected value>Select a location</option>
                {locations.map((location, index)=>{
                    return (
                        <option key={index} value={index}>
                            {location.name}
                        </option>
                    )
                })}
              </select>

            </label>
            <label className="eventCreateLabel">
              <span className="eventCreateFormSpan">Date</span>
              <input className="inputField" type="date"
                value={date}
                onChange={update('Date')}
                placeholder="Date"
                min={new Date().toISOString().split('T')[0]}
              />
            </label>
            {/* <div className="errors">{errors?.lastName}</div> */}
            <label className="eventCreateLabel">
              <span className="eventCreateFormSpan">Start Time</span>
              <input className="inputField" type="time"
                value={startTimeInitial}
                onChange={update('Start Time')}
                placeholder="Start Time"
              />
            </label>
  
  
            {/* <div className="errors">{errors?.school}</div> */}
            <label className="eventCreateLabel">
              <span className="eventCreateFormSpan">End Time</span>
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
                value="Create Session"
                // disabled={!name || !description || !location }
              />
            </label>
          </form>
            
        </div>
      </div>
    );
  }

export default EventCreateForm;