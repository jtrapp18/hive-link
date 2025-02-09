import { useContext, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';
import { formattedTime } from '../helper';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Message from '../components/Message';
import NewMessage from '../forms/NewMessage';
import useCrudStateDB from '../hooks/useCrudStateDB';

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

const MessageCard = ({ id,  forumId, userId, user: msgUser, messageDate, messageText, replies}) => {
    const { user } = useContext(UserContext);
    const { setForums } = useOutletContext();
    const [newReply, setNewReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const {updateKey, deleteFromKey, addNestedKey, updateNestedKey} = useCrudStateDB(setForums, "forums");

    const updateMessage = (updatedText) => {
        const message = ({
          messageText: updatedText,
          userId: user.id,
          forumId: forumId,
        })

        updateKey(forumId, "messages", id, message);
      };
       
      const deleteMessage = (messageId) => {
        deleteFromKey(forumId, "messages", messageId);
      };   
    
      const addReply = (newReply) => {
        const reply = ({
          ...newReply,
          userId: user.id,
          messageId: id,
        })
    
        addNestedKey(forumId, "messages", "replies", reply);
      };
    
      const updateReply = (updatedReply, replyId) => {
        const reply = ({
          ...updatedReply,
          userId: user.id,
          messageId: id,
        })
    
        updateNestedKey(forumId, "messages", id, "replies", replyId, reply);
      }

    return (
        <CardContainer>
            <Message 
                id={id}
                userId={userId}
                msgUser={msgUser}
                messageDate={messageDate}
                messageText={messageText}
                handleUpdate={updateMessage}
                handleDelete={deleteMessage}
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
                    handleAdd={addReply}
                />
            }
            {showReplies &&
                <div className='reply-container'>
                    <div className='reply-line'></div>
                    <div>
                        {replies.map(reply =>
                            <Message
                                key={reply.id}
                                id={reply.id}
                                userId={reply.userId}
                                msgUser={reply.user}
                                messageDate={reply.replyDate}
                                messageText={reply.replyText}
                                handleUpdate={updateReply}
                                // handleDelete={deleteReply}
                            />
                        )}
                    </div>
                </div>
            }
    </CardContainer>
    );
}

export default MessageCard;