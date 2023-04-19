import jwtFetch from "./jwt";
import { getCurrentUser } from "./session";


export const RECEIVE_ALL_EVENTS_FOR_DAY = "events/RECEIVE_ALL_EVENTS_FOR_DAY";
export const RECEIVE_SPECIFIC_EVENT = 'events/RECEIVE_SPECIFIC_EVENT';
export const POST_EVENT = 'events/POST_EVENT';

// Actions
export const receiveAllEventsForDay = allEventsForDay => ({
    type: RECEIVE_ALL_EVENTS_FOR_DAY,
    allEventsForDay
})

export const receiveSpecificEvent = event => ({
    type: RECEIVE_SPECIFIC_EVENT,
    event
})

export const postEvent = event => ({
    type: POST_EVENT,
    event
})

// Events Selectors 
export const getEvents = (state) => {
	return state.events ? Object.values(state.events) : [];
}

export const getMyCreatedEvents = (state) => {
    return state.session.user.createdEvents
}
export const getMyJoinedEvents = (state) => {
    return state.session.user.joinedEvents
}

// Thunk Action Creators 
// year-month-day
// date format: "2023-04-17"
export const fetchAllEventsForDay = (date) => async dispatch => {
    const res = await jwtFetch(`/api/events/?startDate=${date}`);
    const data = await res.json();
    return dispatch(receiveAllEventsForDay(data));
}

export const fetchSpecificEvent = (eventId) => async dispatch => {
    const res = await jwtFetch(`api/events/${eventId}`);
    const data = await res.json();
    console.log(data)
    return dispatch(receiveSpecificEvent(data))
}

// not tested
export const createEvent = (eventInfo) => async dispatch => {
    const res = await jwtFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(eventInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    return dispatch(createEvent(data));
}

export const createEventRequest = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/requests/${eventId}`, {
        method: "POST"
    });

    const data = await res.json();
    dispatch(receiveSpecificEvent(data));
    dispatch(getCurrentUser());
}

const eventsReducer = (state={}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_ALL_EVENTS_FOR_DAY:
            const events = {};
            action.allEventsForDay.forEach(event => events[event._id] = event)
            return events
        case RECEIVE_SPECIFIC_EVENT:
            nextState[action.event._id] = action.event;
            return nextState;
        case POST_EVENT:
            nextState[action.event._id] = action.event;
            return nextState;
        default:
            return state;
    }
}

export default eventsReducer;




