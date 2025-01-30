import { CardContainer } from '../MiscStyling';
import EventCard from '../cards/EventCard';
import styled from 'styled-components';

const Events = ({ events, eventCardProps }) => {

  return (
      <CardContainer>
        {events.length === 0 ?
          <span>No scheduled events</span> :
          (events.map(event=>
            <EventCard
                key={event.id}
                event={event}
                {...eventCardProps}
            />
          ))
        }
        <hr />
      </CardContainer>
    );
  };
  
  export default Events;
  