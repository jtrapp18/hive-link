import { CardContainer } from '../MiscStyling';
import EventCard from '../cards/EventCard';
import MotionWrapper from '../styles/MotionWrapper';

const Events = ({ events, eventCardProps }) => {
  return (
    <CardContainer>
      {events.length === 0 ? (
        <span>No scheduled events</span>
      ) : (
        events.map((event, index) => (
          <MotionWrapper key={event.id} index={index}>
            <EventCard event={event} {...eventCardProps} />
          </MotionWrapper>
        ))
      )}
      <hr />
    </CardContainer>
  );
};

export default Events;