import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJSONById, snakeToCamel } from '../helper';
import Loading from './Loading';
import { StyledContainer } from '../MiscStyling';
import MessageCard from '../cards/MessageCard';
import styled from 'styled-components';
import NewMessage from '../forms/NewMessage';

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
    const { id } = useParams();
    const [forum, setForum] = useState('');

    useEffect(()=> {
        getJSONById("forums", id)
        .then(forum => {
            const forumTransformed = snakeToCamel(forum);
            setForum(forumTransformed);
        })
    }, [])

    if (!forum) return <Loading />

    return (
        <StyledContainer>
            <h1>Discussion</h1>
            <h3>{forum.title}</h3>
            <p>Category: {forum.category}</p>
            <p>{forum.user.username}</p>
            <div>
                {forum.messages.map(message=>
                    <MessageCard
                        key={message.id}
                        {...message} 
                    />
                )}
            </div>
            <NewMessageContainer>
                <NewMessage />
            </NewMessageContainer>
        </StyledContainer>
    );
}

export default ForumDetails; 
