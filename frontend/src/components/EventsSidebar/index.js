import { useSelector } from 'react-redux';
import './EventSidebar.css';
import { getEvents } from '../../store/events';
import EventSidebarItem from './EventSidebarItem';
import { selectedEventId } from '../../store/ui';

const EventSideBar = () => {
  const events = useSelector(getEvents);
  const selectedEvent = useSelector(selectedEventId);

  return (
    <div className="event-sidebar">
      {
        events.map(event => {
          return <EventSidebarItem 
                    event={event} 
                    key={event._id} 
                    selected={selectedEvent === event._id}
                  />
        })
      }
    </div>
  )
}

export default EventSideBar;