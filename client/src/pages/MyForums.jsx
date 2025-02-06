import { useContext, useState, useEffect } from 'react';
import {WindowWidthContext} from "../context/windowSize";
import {UserContext} from '../context/userProvider'
import Forums from '../components/Forums';
import { getJSON, snakeToCamel, getNearbyZipcodes } from '../helper';
import { Button } from '../MiscStyling';
import ForumForm from '../forms/ForumForm'
import usePopupForm from '../hooks/usePopupForm'
import useCrudStateDB from '../hooks/useCrudStateDB';
import Loading from './Loading';
import styled from 'styled-components';
import { StyledContainer } from '../MiscStyling';
import Login from './Login'

const MyForums = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const [forums, setForums] = useState([]);
  const [forumsStarted, setForumsStarted] = useState([]);
  const [forumsParticipated, setForumsParticipated] = useState([]);
  const [forumsOther, setForumsOther] = useState([]);
  const {PopupForm, setActiveItem, setShowNewForm, setShowDeleted} = usePopupForm(ForumForm);

  const forumFiltering = (forums) => {
 
    const forumsStarted = !user ? [] : forums.filter((forum) => forum.userId === user.id)
    const  forumsParticipated = !user ? [] : forums.reduce((acc, forum) => {
        if (forum.messages.some(message => message.userId === user.id)) {
          acc.push(forum);
        }
        return acc;
      }, []);

      const forumsOther = !user
      ? forums
      : forums.filter(forum =>
          !forumsStarted.includes(forum) && !forumsParticipated.includes(forum)
        );

      setForumsStarted(forumsStarted);
      setForumsParticipated(forumsParticipated);
      setForumsOther(forumsOther);
  }

  useEffect(() => {
    getJSON("forums").then((forums) => {
      const forumsTransformed = snakeToCamel(forums);
      setForums(forumsTransformed);
      forumFiltering(forumsTransformed);
    });
  }, []);

  useEffect(() => {
    forumFiltering(forums);
  }, [user]);

  const {addItem, updateItem, deleteItem, addToKey, deleteFromKey} = useCrudStateDB(setForums, "forums", 
    forumFiltering, setActiveItem);

  const addForum = (forum) => {
    addItem(forum);
    setShowNewForm(false);
    setShowDeleted(false);
  };

  const viewForum = (forum) => {
    setActiveItem(forum)
    setShowNewForm(false);
    setShowDeleted(false);
  };

  const deleteForum = (forum) => {
    deleteItem(forum);
    setShowDeleted(true);
  };
  
  const addMessage = (forum) => {
    const message = ({
      userId: user.id,
      forumId: forum.id
    })

    addToKey(forum.id, "messages", message)
  };
   
  const deleteMessage = (forum) => {
    const forumId = forum.id
    const message = forum.messages.filter(message=>message.userId===user.id)[0]
    deleteFromKey(forumId, "messages", message.id)
  };

  const forumCardProps = {
    started: {btnLabel: "Manage forum", handleforumBtn: viewForum},
    participated: {role: "Participated", btnLabel: "Remove forum", handleforumBtn: deleteMessage},
    other: {role: "Other", btnLabel: "Sign Up", handleForumBtn: addMessage},
  }

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
              forumCardProps={forumCardProps.started}
            />
            <h3>Active Forums</h3>
            <Forums
              forums={forumsParticipated}
              forumCardProps={forumCardProps.participated}
            />
          </>
        }
        <h1>Other Forums</h1>
        <h3>. . . . . </h3>
        <Forums
          forums={forumsOther} 
          forumCardProps={forumCardProps.other}
        />
      </StyledContainer>
    );
  };
  
  export default MyForums;
  