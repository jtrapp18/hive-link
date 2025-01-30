import { useContext, useState, useEffect } from 'react';
import {WindowWidthContext} from "../context/windowSize";
import {UserContext} from '../context/userProvider'
import Events from '../components/Events';
import { getJSON, snakeToCamel, postJSONToDb, deleteJSONFromDb } from '../helper';
import EventForm from '../forms/EventForm'
import usePopupForm from '../hooks/usePopupForm'
import useCrud from '../hooks/useCrud';

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const [events, setEvents] = useState([]);
  const {PopupForm, setActiveItem, setShowNewForm} = usePopupForm(EventForm);
  const {addItem, deleteItem, addToKey} = useCrud(setEvents);

  useEffect(() => {
    getJSON("events").then((events) => {
      const eventsTransformed = snakeToCamel(events);
      setEvents(eventsTransformed);
    });
  }, []);

  const addEvent = (event) => {
    postJSONToDb("events", event)
    .then(event => {
      // setEvents(prevEvents => [...prevEvents, event])
      addItem(event)
      
    });
  };
  
  const cancelEvent = (eventId) => {
    deleteJSONFromDb("events", eventId)
    // setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId))
    deleteItem(eventId)
  };
  
  const signupEvent = (eventId) => {
    const signup = ({
      userId: user.id,
      eventId: eventId
    })

    postJSONToDb("signups", signup)
    .then(signup => {
      addToKey(eventId, "signups", signup)
      // setEvents(prevEvents =>
      //   prevEvents.map(event =>
      //     event.id === eventId
      //       ? { ...event, signups: [...event.signups, signup] }
      //       : event
      //   )
      // )
    });
  };
  
  const cancelSignup = (eventId) => {
    deleteJSONFromDb("events", eventId)

    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, signups: event.signups.filter(signup => signup.userId !== user.id) }
          : event
      )
    )

  };

  const eventsHosting = !user ? [] : events.filter((event) => event.userId === user.id)
  const  eventsAttending = !user ? [] : events.reduce((acc, event) => {
      if (event.signups.some(signup => signup.userId === user.id)) {
        acc.push(event);
      }
      return acc;
    }, []);

    const eventsOther = !user
    ? events
    : events.filter(event =>
        !eventsHosting.includes(event) && !eventsAttending.includes(event)
      );

  return (
      <main>
        { user &&
          <>
            <h1>My Events</h1>
            <button onClick={()=>setShowNewForm(true)}>Host a New Event</button>
            <PopupForm />            
            <h3>. . . . . </h3>
            <br />
            <Events
              role={"Hosting"}
              events={eventsHosting}
              handleEventBtn={setActiveItem}
            />
            <Events
              role={"Attending"}
              events={eventsAttending}
              handleEventBtn={cancelSignup}
            />
          </>
        }
        <h1>Other Events</h1>
        <h3>. . . . . </h3>
        <br />
        <Events
          role={"Other"}
          events={eventsOther}
          handleEventBtn={signupEvent}
        />
      </main>
    );
  };
  
  export default MyEvents;
  