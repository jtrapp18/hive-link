import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { getJSONById, snakeToCamel } from '../helper';
import Loading from './Loading';
import { StyledContainer } from '../MiscStyling';
import MessageCard from '../cards/MessageCard';
import styled from 'styled-components';
import NewMessage from '../forms/NewMessage';
import { BackButton } from '../MiscStyling';
import {UserContext} from '../context/userProvider'
import useCrudStateDB from '../hooks/useCrudStateDB';

const NewMessageContainer = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    background: black;
    padding: 5%;
    border-top: 3px double var(--honey);
    z-index: 1000;
`

const ForumDetails = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const forum = location.state?.forum; // Access the passed data
    const navigate = useNavigate();
    const { setForums } = useOutletContext();

    const { addToKey} = useCrudStateDB(setForums, "forums");

        const addMessage = (newMessage) => {
            const message = ({
              ...newMessage,
              userId: user.id,
              forumId: forum.id,
            })
        
            addToKey(forum.id, "messages", message);
          };

    if (!forum) return <Loading />

    return (
        <StyledContainer>
            <h1>Discussion</h1>
            <h3>{forum.title}</h3>
            <p>Category: {forum.category}</p>
            <p>{forum.user.username}</p>
            <BackButton onClick={() => navigate(-1)}>Back to Forums</BackButton>
            <div>
                {forum.messages.map(message=>
                    <MessageCard
                        key={message.id}
                        {...message} 
                    />
                )}
            </div>
            <NewMessageContainer>
                <NewMessage
                    handleAdd={addMessage}
                />
            </NewMessageContainer>
        </StyledContainer>
    );
}

export default ForumDetails; 
