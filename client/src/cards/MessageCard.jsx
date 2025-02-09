import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';
import { formattedTime } from '../helper';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Message from '../components/Message';
import NewMessage from '../forms/NewMessage';

const CardContainer = styled.div`
    .reply-container {
        display: flex;

        .reply-line {
            border-left: 1px solid var(--honey);
            margin: 0% 2% 0% 2%;        
        } 
    }

    .reply-buttons {
        display: flex;

        div {
            cursor: pointer;
            padding: 5px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            align-content: center;
            border-radius: 10px;

            &:hover {
                background: var(--dark-gray);
            }         
        }
    }
`

const MessageCard = ({ id,  userId, user: msgUser, messageDate, messageText, replies}) => {
    const { user } = useContext(UserContext);
    const [newReply, setNewReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const toggleOptions = () => {
        setShowOptions(prev=>!prev)
    }

    return (
        <CardContainer>
            <Message 
                userId={userId}
                msgUser={msgUser}
                messageDate={messageDate}
                messageText={messageText}
            />
            <section className='reply-buttons'>
                <div
                    onClick={()=>setShowReplies(prev=>!prev)}
                >
                    {showReplies ? <FaMinusCircle /> : <FaPlusCircle />}
                </div>
                <div
                    onClick={()=>setNewReply(true)}
                >
                    <p>💬 Reply</p>
                </div>
            </section>
            {newReply && 
                <NewMessage
                    setShow={setNewReply}
                />
            }
            {showReplies &&
                <div className='reply-container'>
                    <div className='reply-line'></div>
                    <div>
                        {replies.map(reply =>
                            <Message 
                                userId={userId}
                                msgUser={reply.user}
                                messageDate={reply.replyDate}
                                messageText={reply.replyText}
                            />
                        )}
                    </div>
                </div>
            }
    </CardContainer>
    );
}

export default MessageCard;