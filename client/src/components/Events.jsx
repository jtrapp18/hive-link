import { CardContainer } from '../MiscStyling';
import EventCard from './EventCard';
import styled from 'styled-components';

const Events = ({events, role, handleEventBtn}) => {

  return (
      <CardContainer>
        <h3>{role}</h3>
        {events.length === 0 ?
          <span>No scheduled events</span> :
          (events.map(event=>
            <EventCard
                key={event.id}
                {...event}
                handleEventBtn={handleEventBtn}
            />
          ))
        }
        <hr />
      </CardContainer>
    );
  };
  
  export default Events;
  