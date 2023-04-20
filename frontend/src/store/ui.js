import jwtFetch from "./jwt";

const RECEIVE_MODAL_TOGGLE = "ui/RECEIVE_MODAL_TOGGLE";
const RECEIVE_EVENT_CLICKED = "ui/RECEIVE_EVENT_CLICKED";
const RECEIVE_TAB_STATE = "ui/RECEIVE_TAB_STATE";
const RECEIVE_DATE = "ui/RECEIVE_DATE";

export const receiveModalToggle = boolean => ({
    type: RECEIVE_MODAL_TOGGLE,
    modalStatus: boolean
})

export const receiveEventClicked = (eventId) => ({
	type: RECEIVE_EVENT_CLICKED,
	eventId
})

export const receiveTabState = (tab) => ({
	type: RECEIVE_TAB_STATE,
	tab
})

export const receiveDate = (date) => ({
    type: RECEIVE_DATE,
    date
})

export const setModalStatus = (boolean) => async dispatch => {
    return dispatch(receiveModalToggle(boolean))
}

export const setTabStatus = (tab) => async dispatch => {
    return dispatch(receiveTabState(tab))
}
export const setDate = (date) => async dispatch => {
    return dispatch(receiveDate(date))
}

// EventId Selector
export const selectedEventId = (state) => {
	return state.ui.selectedEventId ? state.ui.selectedEventId : null;
}
export const selectedTab = (state) => {
    return state.ui.tab ? state.ui.tab : null;
}
export const selectedDate = (state) => {
    return state.ui.date ? state.ui.date : null;
}

const initialState = {
    modalStatus: false,
    tab: "My Events",
    selectedEventId: null,
    date: new Date()
}

const uiReducer = (state = initialState, action) => {
    let nextState = { ...state }
    switch (action.type) {
        case RECEIVE_MODAL_TOGGLE:
            nextState.modalStatus = action.modalStatus
            return nextState
        case RECEIVE_EVENT_CLICKED: 
            nextState.selectedEventId = action.eventId;
            return nextState;
        case RECEIVE_TAB_STATE:
            nextState.tab = action.tab;
            return nextState;
        case RECEIVE_DATE:
            nextState.date = action.date;
            return nextState
        default:
            return state;
    }
}

export default uiReducer;
