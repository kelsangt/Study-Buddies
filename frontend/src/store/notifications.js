export const RECEIVE_NOTIFICATIONS = "events/RECEIVE_NOTIFICATIONS";
export const HIDE_NOTIFICATION = "events/HIDE_NOTIFICATION";

// Actions
export const receiveNotifications = notifications => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications
})

export const hideNotification = payload => ({
  type: HIDE_NOTIFICATION,
  payload
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
    case HIDE_NOTIFICATION:
        nextState[action.payload.notificationType][action.payload.eventId] = null;
        return nextState;
    default:
        return state;
  }
}

export default notificationsReducer;




