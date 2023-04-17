import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { useEffect } from 'react';
import { fetchAllEventsForDay } from '../../store/events';

const MainContent = () => {
    const dispatch = useDispatch();
    const todayEvents = useSelector(state => state.events ? Object.values(state.events) : []);
    // const todaysDate = new Date().toISOString().split("T")[0];

    const testDate = '2023-04-20'
    useEffect(() => {
        dispatch(fetchAllEventsForDay(testDate))
    }, [])
    console.log(todayEvents)
    return (
        <>

        </>
    )
}
export default MainContent;
