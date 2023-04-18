import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { useEffect } from 'react';
import { fetchAllEventsForDay } from '../../store/events';
import { fetchAllLocations } from '../../store/locations';
import GMap from '../GMap/GMap';
import { Wrapper } from "@googlemaps/react-wrapper";
import EventSideBar from '../EventsSidebar';
import ProfileModal from '../ProfileModal/ProfileModal';

const MainContent = () => {
    const dispatch = useDispatch();
    const todayEvents = useSelector(state => state.events ? Object.values(state.events) : []);
    const modalToggle = useSelector(state => state.ui.modalStatus)
    // const todaysDate = new Date().toISOString().split("T")[0];

    const testDate = '2023-04-23'
    useEffect(() => {
        dispatch(fetchAllEventsForDay(testDate));
				dispatch(fetchAllLocations());

    }, [dispatch])

    console.log(todayEvents)
    return (
        <>
            <EventSideBar />
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                <GMap />
            </Wrapper>
            {modalToggle && <ProfileModal/>}
        </>
    )
}
export default MainContent;
