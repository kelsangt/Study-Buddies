import jwtFetch from "./jwt";

export const RECEIVE_ALL_LOCATIONS = 'locations/RECEIVE_ALL_LOCATIONS';
export const RECEIVE_SPECIFIC_LOCATION = 'locations/RECEIVE_SPECIFIC_LOCATION';

export const receiveAllLocations = allLocations => ({
    type: RECEIVE_ALL_LOCATIONS,
    allLocations
});

export const getLocations = (state) => {
	return state.locations ? Object.values(state.locations) : [];
}
export const receiveSpecificLocation = (location) => ({
    type: RECEIVE_SPECIFIC_LOCATION,
    location
});



export const fetchAllLocations = () => async dispatch => {
    const res = await jwtFetch('/api/locations');
    const data = await res.json();
    return dispatch(receiveAllLocations(data))
}

// does not work yet
export const fetchSpecificLocation = (locationId) => async dispatch => {
    const res = await jwtFetch(`/api/locations/${locationId}`);
    const data = await res.json();
    debugger
    return dispatch(receiveSpecificLocation(data));
}

const locationReducer = (state={}, action) => {
    let nextState = {...state};
    switch (action.type) {
        case RECEIVE_ALL_LOCATIONS:
            const locations = {};
            action.allLocations.forEach((location, index) => locations[index] = location)
            return locations
        case RECEIVE_SPECIFIC_LOCATION:
            nextState[action.location._id] = action.location
            return nextState
        default:
            return state;
    }
}

export default locationReducer;