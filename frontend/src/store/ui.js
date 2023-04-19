import jwtFetch from "./jwt";

const RECEIVE_MODAL_TOGGLE = "ui/RECEIVE_MODAL_TOGGLE";
const RECEIVE_EVENT_CLICKED = "ui/RECEIVE_EVENT_CLICKED";
const RECEIVE_TAB_STATE = "ui/RECEIVE_TAB_STATE";

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

export const setModalStatus = (boolean) => async dispatch => {
    return dispatch(receiveModalToggle(boolean))
}

export const setTabStatus = (tab) => async dispatch => {
    return dispatch(receiveTabState(tab))
}

// EventId Selector
export const selectedEventId = (state) => {
	return state.ui.selectedEventId ? state.ui.selectedEventId : null;
}
export const selectedTab = (state) => {
    return state.ui.tab ? state.ui.tab : null;
}

const initialState = {
    modalStatus: false,
    tab: "My Events",
    selectedEventId: null
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
            // debugger
            nextState.tab = action.tab;
            return nextState;
        default:
            return state;
    }
}

export default uiReducer;
