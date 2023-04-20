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
import { receiveEventClicked, selectedEventId } from '../../store/ui';
import Footer from '../Footer/Footer';
import { selectedDate } from '../../store/ui';

const MainContent = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectedDate);
    const todayEvents = useSelector(state => state.events ? Object.values(state.events) : []);
    const modalToggle = useSelector(state => state.ui.modalStatus)
    const selectedId = useSelector(selectedEventId);
    const todaysDate = new Date().toISOString().split("T")[0];
    
    useEffect(() => {
        dispatch(fetchAllEventsForDay(currentDate));
        // dispatch(fetchAllLocations());

    }, [dispatch, currentDate])

    useEffect(() => {
        const closeButton = document.querySelectorAll('button.gm-ui-hover-effect');
        console.log("close", closeButton);
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

    return (
        <>
            <div id="mainContent">  
                <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render} libraries={["places", "geocoder"]}>
                </Wrapper>
                {modalToggle && <ProfileModal/>}
                <Footer />
            </div>
        </>
    )
}
export default MainContent;
