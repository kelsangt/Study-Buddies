import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { useEffect } from 'react';
import { fetchAllEventsForDay } from '../../store/events';
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

const MainContent = () => {
    const dispatch = useDispatch();
    const modalToggle = useSelector(state => state.ui.modalStatus)
    const selectedId = useSelector(selectedEventId);
    const date = useSelector(selectedDate)
		const selectedEventModalStatus = useSelector(selectedEventDetailsModalStatus);
		const selectedEvent = useSelector(getSpecificEvents(selectedId));
		const fetchEvents = useSelector(getFetchEvents);
    
    useEffect(() => {
        // console.log("date", date.toLocaleDateString("en-us", {dateStyle: "long"}).split("T")[0]);
        dispatch(fetchAllEventsForDay(date.toLocaleDateString("en-us").split("T")[0]));
        // dispatch(fetchAllLocations());
    }, [dispatch, date])

    useEffect(() => {
        if (fetchEvents) {
            dispatch(fetchAllEventsForDay(date.toLocaleDateString("en-us").split("T")[0]));
            dispatch(setFetchNewEvents(false));
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
                <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render} libraries={["places"]}>
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
