import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { useEffect } from 'react';
import { fetchAllEventsForDay, getMyCreatedEvents, getMyJoinedEvents } from '../../store/events';
import { fetchAllLocations } from '../../store/locations';
import GMap from '../GMap/GMap';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import EventSideBar from '../EventsSidebar';
import ProfileModal from '../ProfileModal/ProfileModal';
import Loading from '../GMap/Loading/Loading';
import { getFetchEvents, receiveEventClicked, selectedEventId, setFetchNewEvents } from '../../store/ui';
import Footer from '../Footer/Footer';
import { selectedDate, selectedEventDetailsModalStatus } from '../../store/ui';
import { CenterModal } from '../../context/Modal';
import EventShow from '../EventShow';
import { getSpecificEvents } from '../../store/events';
import { showSelectedEventDetails } from '../../store/ui';
import { receiveNotifications } from '../../store/notifications';

const MainContent = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectedDate);
    const todayEvents = useSelector(state => state.events ? Object.values(state.events) : []);
    const modalToggle = useSelector(state => state.ui.modalStatus)
    const selectedId = useSelector(selectedEventId);
    const date = useSelector(selectedDate)
    const selectedEventModalStatus = useSelector(selectedEventDetailsModalStatus);
    const selectedEvent = useSelector(getSpecificEvents(selectedId));
    const fetchEvents = useSelector(getFetchEvents);

    const createdEvents = useSelector(getMyCreatedEvents);
    const joinedEvents = useSelector(getMyJoinedEvents);
    
    const createNotifications = () => {
        const notifications = {
            "<1 hour": [],
            "6 hours": [],
            "12 hours": []
        }

        const allMyEvents = createdEvents.concat(joinedEvents);

        const today = new Date();
        allMyEvents.forEach(event => {
            const startTime = new Date(event.startTime);
            const minDiff = Math.floor((startTime - today) / 1000 / 60)
            
            if (minDiff < 0) return;
            if (minDiff <= 60) { // 1 hour
                console.log(event)
                notifications["<1 hour"].push(event)
            } else if (minDiff <= 360) { // 6 hours
                console.log(event)
                notifications["6 hours"].push(event)
            } else if (minDiff <= 720) { // 12 hours
                console.log(event)
                notifications["12 hours"].push(event)
            }
        })

        dispatch(receiveNotifications(notifications));
    }

    useEffect(() => {
        createNotifications();
        const notificationInterval = setInterval(createNotifications, 60000) 

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

    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return <Loading />; 
            case Status.SUCCESS: 
                return <GMap />;
            default:
                return null;
        }
    }

		const leaveEventShowPage = () => {
			dispatch(receiveEventClicked(selectedEvent._id));
			dispatch(showSelectedEventDetails(false));
	
			const sideModal = document.getElementById('profile-modal-container');
			if (sideModal) sideModal.style.display = 'flex';
		}

    return (
        <>
            <div id="mainContent">  
                <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render} libraries={["places", "geocoder"]}>
                </Wrapper>
                {modalToggle && <ProfileModal/>}
                <Footer />
            </div>
						
						{selectedEventModalStatus && (
							<CenterModal onClose={leaveEventShowPage}>
								<EventShow event={selectedEvent} />
							</CenterModal>
						)}
        </>
    )
}
export default MainContent;
