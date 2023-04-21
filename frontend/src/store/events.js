import jwtFetch from "./jwt";
import { addCreatedEvent, addRequestedEvent, deleteCreatedEvent, deleteJoinedEvent, deleteRequestedEvent, getCurrentUser } from "./session";


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
    return state.session.user?.createdEvents ? Object.values(state.session.user.createdEvents) : []
}
export const getMyJoinedEvents = (state) => {
    return state.session.user?.joinedEvents ? Object.values(state.session.user.joinedEvents) : []
}
export const getMyRequestedEvents = (state) => {
    return state.session.user?.requestedEvents ? Object.values(state.session.user.requestedEvents) : []
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

export const createEvent = (eventInfo) => async dispatch => {
    console.log("create");

    const res = await jwtFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(eventInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();
    // dispatch(receiveSpecificEvent(data));
    
    // refactor this later when adding date filter
    const todaysDate = new Date().toISOString().split("T")[0];
    dispatch(fetchAllEventsForDay(todaysDate));

    dispatch(addCreatedEvent(data));
}

export const createEventRequest = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}/requests`, {
        method: "POST"
    });

    const data = await res.json();
    // dispatch(receiveSpecificEvent(data));

    // refactor this later when adding date filter
    const todaysDate = new Date().toISOString().split("T")[0];
    dispatch(fetchAllEventsForDay(todaysDate));

    dispatch(addRequestedEvent(data));
}

export const deleteEvent = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })

    const data = await res.json();
    if (data === "created deleted") {
        dispatch(deleteCreatedEvent(eventId));
    } else if (data === "joined deleted") {
        dispatch(deleteJoinedEvent(eventId));
    }

    // refactor this later when adding date filter
    const todaysDate = new Date().toISOString().split("T")[0];
    dispatch(fetchAllEventsForDay(todaysDate));
}

export const updateEvent = (eventInfo) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventInfo._id}`, {
        method: 'PATCH',
        body: JSON.stringify(eventInfo)
    })

    const data = await res.json();
    console.log(data);
    dispatch(addCreatedEvent(data));
}

export const updateRequester = (eventId, userId, choice) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}/requests/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({choice})
    })

    const data = await res.json();
    dispatch(addCreatedEvent(data));

    // refactor this later when adding date filter
    const todaysDate = new Date().toISOString().split("T")[0];
    dispatch(fetchAllEventsForDay(todaysDate));
}

export const deleteAttendee = (eventId, userId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}/attendees/${userId}`, {
        method: 'DELETE'
    })

    const data = await res.json();
    dispatch(addCreatedEvent(data));

    // refactor this later when adding date filter
    const todaysDate = new Date().toISOString().split("T")[0];
    dispatch(fetchAllEventsForDay(todaysDate));
}

export const deleteRequest = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}/requests`, {
        method: "DELETE"
    })

    dispatch(deleteRequestedEvent(eventId));
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




