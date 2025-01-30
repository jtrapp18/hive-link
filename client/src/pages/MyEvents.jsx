import { useContext, useState, useEffect } from 'react';
import {WindowWidthContext} from "../context/windowSize";
import {UserContext} from '../context/userProvider'
import Events from '../components/Events';
import { getJSON, snakeToCamel, postJSONToDb, deleteJSONFromDb, getNearbyZipcodes } from '../helper';
import { Button } from '../MiscStyling';
import EventForm from '../forms/EventForm'
import usePopupForm from '../hooks/usePopupForm'
import useCrud from '../hooks/useCrud';
import Loading from './Loading';
import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

  p {
    margin: 0;
  }
  
  span {
    color: var(--honey);
  }

  section {
    display: flex;
    justify-content: center;

  }

  input, button {
    margin: 5px;
  }

  input {
    color: black;

    &:hover {
      background: var(--yellow);
    }

    &#zipcode {
      width: 100px;
    }

    &#radius {
      width: 50px;
    }
  }
`

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const [events, setEvents] = useState([]);
  const {PopupForm, setActiveItem, setShowNewForm} = usePopupForm(EventForm);
  const {addItem, deleteItem, addToKey} = useCrud(setEvents);
  const [filterZip, setFilterZip] = useState(!user ? '' : user.zipcode);
  const [filterRadius, setFilterRadius] = useState(5);
  const [nearbyZipcodes, setNearbyZipcodes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    getJSON("events").then((events) => {
      const eventsTransformed = snakeToCamel(events);
      setEvents(eventsTransformed);
    });
  }, []);

  // useEffect(() => {
  //   apiZipcodeCall();
  // }, [filterRadius]);

  function apiZipcodeCall() {
    if (filterZip) {
      getNearbyZipcodes(filterZip, filterRadius).then((json) => {
        const zipcodesTransformed = snakeToCamel(json);
        const zipcodeList = zipcodesTransformed.zipCodes.map(z=>z.zipCode);
        setNearbyZipcodes(zipcodeList);
        setIsFiltered(true);

        console.log("Nearby Zipcodes:", zipcodeList)
      });
    }
  }

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

    const eventsFiltered = nearbyZipcodes.length===0
    ? eventsOther
    : eventsOther.filter(event =>
        nearbyZipcodes.includes(event.zipcode)
      );

    const eventCardProps = {
      host: {btnLabel: "Manage Event", handleEventBtn: setActiveItem},
      attendee: {role: "Attending", btnLabel: "Remove Event", handleEventBtn: cancelSignup},
      other: {role: "Other", btnLabel: "Sign Up", handleEventBtn: signupEvent},
    }

    const clearFilters = () => {
      setNearbyZipcodes([]);
      setIsFiltered(false);
    }

  if (!events) return <Loading />

  return (
      <main>
        { user &&
          <>
            <h1>My Events</h1>
            <button onClick={()=>setShowNewForm(true)}>Host a New Event</button>
            <PopupForm />            
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
        <SearchContainer>
          <p htmlFor='zipcode'>Search near Zipcode: 
            <input
              id='zipcode'
              name='zipcode'
              onChange={(event)=>setFilterZip(event.target.value)}
              value={filterZip}
            >
            </input>

            within

            <input
              id='radius'
              type="number"
              name='radius'
              onChange={(event)=>setFilterRadius(event.target.value)}
              value={filterRadius}
            >
            </input>
            miles
          </p>
          {/* Manually click button to avoid making too many API calls */}
          <section>
            <Button onClick={apiZipcodeCall}>Submit</Button>
            <Button onClick={clearFilters}>Clear</Button>
          </section>
          {isFiltered ? <span>{`Filtered on events within ${filterRadius} miles of ${filterZip}`}</span> : <span>No Filters Applied</span>}
        </SearchContainer>
        <h3>. . . . . </h3>
        <Events
          events={eventsFiltered} 
          eventCardProps={eventCardProps.other}
        />
      </main>
    );
  };
  
  export default MyEvents;
  