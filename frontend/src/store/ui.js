import jwtFetch from "./jwt";

const RECEIVE_MODAL_TOGGLE = "ui/RECEIVE_MODAL_TOGGLE";

export const receiveModalToggle = boolean => ({
    type: RECEIVE_MODAL_TOGGLE,
    modalStatus: boolean
})

export const setModalStatus = (boolean) => async dispatch => {
    return dispatch(receiveModalToggle(boolean))
}
const initialState = {
    modalStatus: false
}

const uiReducer = (state = initialState, action) => {
    let nextState = { ...state }
    switch (action.type) {
        case RECEIVE_MODAL_TOGGLE:
            nextState.modalStatus = action.modalStatus
            // debugger
            return nextState
        default:
            return state;
    }
}

export default uiReducer;
