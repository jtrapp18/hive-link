import { useContext, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {WindowWidthContext} from "../context/windowSize";
import {UserContext} from '../context/userProvider'
import Forums from '../components/Forums';
import { getJSON, snakeToCamel, getNearbyZipcodes } from '../helper';
import { Button } from '../MiscStyling';
import ForumForm from '../forms/ForumForm'
import usePopupForm from '../hooks/usePopupForm'
import useCrudStateDB from '../hooks/useCrudStateDB';
import Loading from './Loading';
import { StyledContainer } from '../MiscStyling';
import Login from './Login'

const MyForums = () => {
  const { user } = useContext(UserContext);
  const [forums, setForums] = useState([]);
  const { isMobile } = useContext(WindowWidthContext);
  const [forumsStarted, setForumsStarted] = useState([]);
  const [forumsParticipated, setForumsParticipated] = useState([]);
  const [forumsOther, setForumsOther] = useState([]);
  const {PopupForm, setActiveItem, setShowNewForm, setShowDeleted} = usePopupForm(ForumForm);

  const forumFiltering = (forums) => {
    const forumsStarted = forums.filter(forum => forum.isStartedByUser);
    const forumsParticipated = forums.filter(forum => forum.isParticipatedByUser);
    const forumsOther = forums.filter(forum => !forum.isStartedByUser && !forum.isParticipatedByUser);
  
    setForumsStarted(forumsStarted);
    setForumsParticipated(forumsParticipated);
    setForumsOther(forumsOther);
  };

  useEffect(() => {
    if (user) {
      getJSON("forums").then((forums) => {
        const forumsTransformed = snakeToCamel(forums);
        setForums(forumsTransformed);
        forumFiltering(forumsTransformed);
      });
    }
  }, [user]);

  const {addItem, updateItem, deleteItem} = useCrudStateDB(setForums, "forums", 
    forumFiltering, setActiveItem);

  const addForum = (forum) => {
    addItem(forum);
    setShowNewForm(false);
    setShowDeleted(false);
  };

  const deleteForum = (forum) => {
    deleteItem(forum);
    setShowDeleted(true);
  };

  if (!user) return <Login errMessage="Must be logged in to view forums"/>
  if (!Forums) return <Loading />

  return (
      <StyledContainer>
        { user &&
          <>
            <h1>My Forums</h1>
            <Button onClick={()=>setShowNewForm(true)}>Create a New forum</Button>
            <PopupForm
              addForum={addForum}
              deleteForum={deleteForum}
              updateforum={updateItem}
            />
            <h3>. . . . . </h3>
            <br />
            <h3>Created by Me</h3>
            <Forums
              forums={forumsStarted}
            />
            <h3>My Active Forums</h3>
            <Forums
              forums={forumsParticipated}
            />
          </>
        }
        <h1>Other Forums</h1>
        <h3>. . . . . </h3>
        <Forums
          forums={forumsOther} 
        />
      </StyledContainer>
    );
  };
  
  export default MyForums;
  