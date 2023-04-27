export const RECEIVE_NOTIFICATIONS = "events/RECEIVE_NOTIFICATIONS";
export const HIDE_NOTIFICATION = "events/HIDE_NOTIFICATION";
export const HIDE_ALL_NOTIFICATIONS = "events/HIDE_ALL_NOTIFICATIONS";

// Actions
export const receiveNotifications = notifications => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications
})

export const hideNotification = payload => ({
  type: HIDE_NOTIFICATION,
  payload
})

export const hideAllNotifications = () => ({
  type: HIDE_ALL_NOTIFICATIONS
})

// Selectors 
export const getNotifications = (state) => {
  return state.notifications ? state.notifications : {}
}

console.log(localStorage.getItem("notifications"))
const initialState = JSON.parse(localStorage.getItem("notifications")) || {
  "<1 hour": {},
  "6 hours": {},
  "12 hours": {}
}

const notificationsReducer = (state=initialState, action) => {
  let nextState = {...state}
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
        localStorage.setItem("notifications", JSON.stringify({...action.notifications}))
        return {...action.notifications}
    case HIDE_NOTIFICATION:
        nextState[action.payload.notificationType][action.payload.eventId] = null;
        localStorage.setItem("notifications", JSON.stringify(nextState));
        return nextState;
      case HIDE_ALL_NOTIFICATIONS:
        Object.keys(nextState).forEach(notificationType => {
          Object.keys(nextState[notificationType]).forEach(eventId => {
            nextState[notificationType][eventId] = null;
          })
        })
        localStorage.setItem("notifications", JSON.stringify(nextState));
        return nextState;
    default:
        return state;
  }
}

export default notificationsReducer;




