import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJSONById, snakeToCamel } from '../helper';
import Loading from './Loading';
import { StyledContainer } from '../MiscStyling';
import MessageCard from '../cards/MessageCard';
import styled from 'styled-components';

const MessageContainer = styled.div`

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
        </StyledContainer>
    );
}

export default ForumDetails; 
