import { useDispatch, useSelector } from 'react-redux';
import './EventSidebar.css';
import { fetchAllEventsForDay, getEvents, getMyCreatedEvents, getMyJoinedEvents } from '../../store/events';
import EventSidebarItem from './EventSidebarItem';
import { getFetchEvents, receiveEventClicked, selectedDate, selectedEventDetailsModalStatus, selectedEventId, setFetchNewEvents, showSelectedEventDetails } from '../../store/ui';
import DateSelector from '../DateSelector/DateSelector';
import { getNotifications, receiveNotifications } from '../../store/notifications';
import { useEffect } from 'react';
import Loading from '../GMap/Loading/Loading';
import GMap from '../GMap/GMap';
import { CenterModal } from '../../context/Modal';
import EventShow from '../EventShow';

const EventSideBar = () => {
  const events = useSelector(getEvents);
  const selectedEvent = useSelector(selectedEventId);
  const modalToggle = useSelector(state => state.ui.modalStatus)
  const dispatch = useDispatch();
    // const currentDate = useSelector(selectedDate);
    // const todayEvents = useSelector(state => state.events ? Object.values(state.events) : []);
    // const modalToggle = useSelector(state => state.ui.modalStatus)
    const selectedId = useSelector(selectedEventId);
    const date = useSelector(selectedDate)
    const selectedEventModalStatus = useSelector(selectedEventDetailsModalStatus);
    const fetchEvents = useSelector(getFetchEvents);
    
    const notifications = useSelector(getNotifications);
    const createdEvents = useSelector(getMyCreatedEvents);
    const joinedEvents = useSelector(getMyJoinedEvents);
    
    const createNotifications = () => {
        const allMyEvents = createdEvents.concat(joinedEvents);
        const newNotifications = {
          "<1 hour": {},
          "6 hours": {},
          "12 hours": {}
        }
        
        const today = new Date();
        allMyEvents.forEach(event => {
            const startTime = new Date(event.startTime);
            const minDiff = Math.floor((startTime - today) / 1000 / 60)
            
            if (minDiff < 0) return;
            if (minDiff <= 60) { // 1 hour
              if (notifications["<1 hour"][event._id] !== null) {
                newNotifications["<1 hour"][event._id] = event;
              } else {
                newNotifications["<1 hour"][event._id] = null;
              }
            } else if (minDiff <= 360) { // 6 hours
              if (notifications["6 hours"][event._id] !== null) {
                newNotifications["6 hours"][event._id] = event;
              } else {
                newNotifications["6 hours"][event._id] = null;
              }
            } else if (minDiff <= 720) { // 12 hours
              if (notifications["12 hours"][event._id] !== null) {
                newNotifications["12 hours"][event._id] = event;
              } else {
                newNotifications["12 hours"][event._id] = null;
              }
            }
        })

        dispatch(receiveNotifications(newNotifications));
    }

    useEffect(() => {
        createNotifications();
        // updates notifications every half hour
        const notificationInterval = setInterval(createNotifications, 1800000);

        return () => {
            clearInterval(notificationInterval);
        }
    }, [])
    
    useEffect(() => {
        // console.log("date", date.toLocaleDateString("en-us", {dateStyle: "long"}).split("T")[0]);
        dispatch(fetchAllEventsForDay(date.toLocaleDateString("en-us").split("T")[0]));
        // dispatch(fetchAllLocations());
    }, [dispatch, date])

    useEffect(() => {
        if (fetchEvents) {
            dispatch(fetchAllEventsForDay(date.toLocaleDateString("en-us").split("T")[0]));
            dispatch(setFetchNewEvents(false));
            createNotifications();
        }
    }, [dispatch, fetchEvents])

    useEffect(() => {
        const closeButton = document.querySelectorAll('button.gm-ui-hover-effect');
        closeButton.forEach(button => button.addEventListener('click', () => dispatch(receiveEventClicked(null))))
    }, [selectedId])


		const leaveEventShowPage = () => {
			dispatch(receiveEventClicked(selectedEvent._id));
			dispatch(showSelectedEventDetails(false));
	
			const sideModal = document.getElementById('profile-modal-container');
			if (sideModal) sideModal.style.display = 'flex';
		}

  return (
    <div className="event-sidebar">
      <DateSelector id='dateselector'/>
      {
        events.map(event => {
          return <EventSidebarItem 
                    event={event} 
                    key={event._id} 
                    selected={selectedEvent === event._id}
                  />
        })
      }

{selectedEventModalStatus && (
							<CenterModal onClose={leaveEventShowPage}>
								<EventShow event={selectedEvent} />
							</CenterModal>
						)}
    </div>
  )
}

export default EventSideBar;