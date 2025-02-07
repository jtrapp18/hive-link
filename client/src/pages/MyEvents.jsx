import { useContext, useState, useEffect } from 'react';
import {WindowWidthContext} from "../context/windowSize";
import {UserContext} from '../context/userProvider'
import Events from '../components/Events';
import { getJSON, snakeToCamel, getNearbyZipcodes } from '../helper';
import { Button } from '../MiscStyling';
import EventForm from '../forms/EventForm'
import usePopupForm from '../hooks/usePopupForm'
import useCrudStateDB from '../hooks/useCrudStateDB';
import Loading from './Loading';
import styled from 'styled-components';
import { StyledContainer } from '../MiscStyling';
import EventSearch from '../components/EventSearch';

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const [events, setEvents] = useState([]);
  const [eventsHosting, setEventsHosting] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [eventsFiltered, setEventsFiltered] = useState([]);
  const {PopupForm, setActiveItem, setShowNewForm, setShowDeleted} = usePopupForm(EventForm);
  const [nearbyZipcodes, setNearbyZipcodes] = useState([]);

  const eventFiltering = (events) => {
 
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

      const eventsFiltered = nearbyZipcodes.length===0
      ? eventsOther
      : eventsOther.filter(event =>
          nearbyZipcodes.includes(event.zipcode)
        );

      setEventsHosting(eventsHosting);
      setEventsAttending(eventsAttending);
      setEventsFiltered(eventsFiltered);
  }

  useEffect(() => {
    getJSON("events").then((events) => {
      const eventsTransformed = snakeToCamel(events);
      setEvents(eventsTransformed);
      eventFiltering(eventsTransformed);
    });
  }, []);

  useEffect(() => {
    eventFiltering(events);
  }, [user]);

  const {addItem, updateItem, deleteItem, addToKey, deleteFromKey} = useCrudStateDB(setEvents, "events", 
    eventFiltering, setActiveItem);

  const addEvent = (event) => {
    addItem(event);
    setShowNewForm(false);
    setShowDeleted(false);
  };

  const viewEvent = (event) => {
    setActiveItem(event)
    setShowNewForm(false);
    setShowDeleted(false);
  };

  const cancelEvent = (event) => {
    deleteItem(event);
    setShowDeleted(true);
  };
  
  const signupEvent = (event) => {
    const signup = ({
      userId: user.id,
      eventId: event.id
    })

    addToKey(event.id, "signups", signup)
  };
   
  const cancelSignup = (event) => {
    const eventId = event.id
    const signup = event.signups.filter(signup=>signup.userId===user.id)[0]
    deleteFromKey(eventId, "signups", signup.id)
  };

  const eventCardProps = {
    host: {btnLabel: "Manage Event", handleEventBtn: viewEvent},
    attendee: {role: "Attending", btnLabel: "Remove Event", handleEventBtn: cancelSignup},
    other: {role: "Other", btnLabel: "Sign Up", handleEventBtn: signupEvent},
  }

  if (!events) return <Loading />

  return (
      <StyledContainer>
        { user &&
          <>
            <h1>My Events</h1>
            <Button onClick={()=>setShowNewForm(true)}>Host a New Event</Button>
            <PopupForm
              addEvent={addEvent}
              cancelEvent={cancelEvent}
              updateEvent={updateItem}
            />
            <h3>. . . . . </h3>
            <br />
            <h3>Hosting</h3>
            <Events
              events={eventsHosting}
              eventCardProps={eventCardProps.host}
            />
            <h3>Attending</h3>
            <Events
              events={eventsAttending}
              eventCardProps={eventCardProps.attendee}
            />
          </>
        }
        <h1>Find Events</h1>
        <EventSearch
          setNearbyZipcodes={setNearbyZipcodes}
        />
        <h3>. . . . . </h3>
        <Events
          events={eventsFiltered} 
          eventCardProps={eventCardProps.other}
        />
      </StyledContainer>
    );
  };
  
  export default MyEvents;
  