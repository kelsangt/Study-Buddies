export const RECEIVE_NOTIFICATIONS = "events/RECEIVE_NOTIFICATIONS";

// Actions
export const receiveNotifications = notifications => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications
})

// Selectors 
export const getNotifications = (state) => {
  return state.notifications ? state.notifications : {}
}

const initialState = {
  "<1 hour": {},
  "6 hours": {},
  "12 hours": {}
}

const notificationsReducer = (state=initialState, action) => {
  let nextState = {...state}
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
        return {...action.notifications}
    default:
        return state;
  }
}

export default notificationsReducer;




