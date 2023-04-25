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

const notificationsReducer = (state={}, action) => {
  let nextState = {...state}
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
        return {...action.notifications}
    default:
        return state;
  }
}

export default notificationsReducer;




