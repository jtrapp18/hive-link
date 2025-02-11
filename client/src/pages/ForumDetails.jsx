import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getJSONById, snakeToCamel } from '../helper';
import Loading from './Loading';
import { StyledContainer } from '../MiscStyling';
import MessageCard from '../cards/MessageCard';
import styled from 'styled-components';
import NewMessage from '../forms/NewMessage';
import {UserContext} from '../context/userProvider'
import useCrudStateDB from '../hooks/useCrudStateDB';
import { ForumProvider } from '../context/forumProvider';
import { formattedTime } from '../helper';
import BackButton from '../components/BackButton';

const ForumHeader = styled.div`
    width: fit-content;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // text-align: center;

    h2 {
        color: var(--yellow);
    }

    span {
        color: gray;
    }
`

const NewMessageContainer = styled.div`
    width: 100%;
    background: black;
    margin: 1%;
    padding: 3%;
    border-top: 3px double var(--honey);
    display: flex;
    justify-content: center;
`

const NewMessageButton = styled.button`
    color: var(--honey);
    background: black;
    width: 50%;
    border-radius: 30px;
    border: 1px solid var(--honey);
    padding: 1%;

    &:hover {
        color: black;
        background: var(--honey);
    }
`

const ForumDetails = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [forum, setForum] = useState(null);
    const [showNew, setShowNew] = useState(true);

    useEffect(() => {
        getJSONById("forums", id)
        .then(json => {
            const jsonTransformed = snakeToCamel(json);
            setForum(jsonTransformed);
        })
    }, []);

    const { addToKey } = useCrudStateDB(setForum, "forums");

        const addMessage = (newMessage) => {
            const message = ({
              messageText: newMessage,
              userId: user.id,
              forumId: forum.id,
            })
        
            addToKey("messages", message);
          };

    if (!forum) return <Loading />

    return (
        <ForumProvider value={{ forum, setForum }}>
            <StyledContainer>
                <BackButton />
                <ForumHeader>
                    <span>{forum.user.username} | {formattedTime(forum.createdAt)}</span>
                    <h2>{forum.title}</h2>
                    {/* <h3><strong>Category: </strong>{forum.category}</h3> */}
                </ForumHeader>
                <div>
                    {forum.messages.map(message=>
                        <MessageCard
                            key={message.id}
                            {...message} 
                        />
                    )}
                </div>
                <NewMessageContainer>
                {showNew ?
                    <NewMessage
                        setShow={setShowNew}
                        handleAdd={addMessage}
                    />
                     :
                    <NewMessageButton onClick={()=>setShowNew(true)}>+ New Message</NewMessageButton>
                }
                </NewMessageContainer>
            </StyledContainer>
        </ForumProvider>
    );
}

export default ForumDetails;
