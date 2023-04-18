import { useSelector } from 'react-redux';
import './EventSidebar.css';
import { getEvents } from '../../store/events';
import EventSidebarItem from './EventSidebarItem';

const EventSideBar = () => {
  const events = useSelector(getEvents);

  return (
    <div className="event-sidebar">
      {
        events.map(event => {
          return <EventSidebarItem event={event} key={event._id}/>
        })
      }
    </div>
  )
}

export default EventSideBar;