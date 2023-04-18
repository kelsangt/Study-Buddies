import jwtFetch from "./jwt";

const RECEIVE_MODAL_TOGGLE = "ui/RECEIVE_MODAL_TOGGLE";
const RECEIVE_EVENT_CLICKED = "ui/RECEIVE_EVENT_CLICKED"

export const receiveModalToggle = boolean => ({
    type: RECEIVE_MODAL_TOGGLE,
    modalStatus: boolean
})

export const receiveEventClicked = (eventId) => ({
	type: RECEIVE_EVENT_CLICKED,
	eventId
})

export const setModalStatus = (boolean) => async dispatch => {
    return dispatch(receiveModalToggle(boolean))
}

// EventId Selector
export const selectedEventId = (state) => {
	return state.ui.selectedEventId ? state.ui.selectedEventId : null;
}

const initialState = {
    modalStatus: false,
    selectedEventId: null
}

const uiReducer = (state = initialState, action) => {
    let nextState = { ...state }
    switch (action.type) {
        case RECEIVE_MODAL_TOGGLE:
            nextState.modalStatus = action.modalStatus
            // debugger
            return nextState
        case RECEIVE_EVENT_CLICKED: 
            nextState.selectedEventId = action.eventId;
            return nextState;
        default:
            return state;
    }
}

export default uiReducer;
