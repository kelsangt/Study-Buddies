import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { useEffect } from 'react';
import { fetchAllEventsForDay } from '../../store/events';
import GMap from '../GMap/GMap';
import { Wrapper } from "@googlemaps/react-wrapper";

const MainContent = () => {
    const dispatch = useDispatch();
    const todayEvents = useSelector(state => state.events ? Object.values(state.events) : []);
    // const todaysDate = new Date().toISOString().split("T")[0];

    const testDate = '2023-04-23'
    useEffect(() => {
        dispatch(fetchAllEventsForDay(testDate))
    }, [dispatch])
    console.log(todayEvents)
    return (
        <>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                <GMap />
            </Wrapper>
        </>
    )
}
export default MainContent;
