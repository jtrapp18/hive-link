import { useContext, useState } from 'react';
import { UserContext } from '../context/userProvider';
import { ForumContext } from '../context/forumProvider';
import styled from 'styled-components';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Message from '../components/Message';
import NewMessage from '../forms/NewMessage';
import useCrudStateDB from '../hooks/useCrudStateDB';

const CardContainer = styled.div`
    width: 100%;
    
    .reply-container {
        display: flex;

        .reply-line {
            border-left: 1px solid var(--honey);
            margin: 0% 2% 0% 2%;        
        } 
    }

    section.reply-options {
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
            
            p {
                padding: 0;
                margin: 0 0 0 5px;
            }
        }
    }
`

const MessageCard = ({ id,  forumId, userId, user: msgUser, messageDate, messageText, replies}) => {
    const { user } = useContext(UserContext);
    const { setForum } = useContext(ForumContext);
    const [newReply, setNewReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const {updateKey, deleteFromKey, addNestedKey, updateNestedKey, deleteNestedKey} = useCrudStateDB(setForum, "forums");

    const updateMessage = (updatedText, messageId) => {
        const message = ({
          messageText: updatedText,
          userId: user.id,
          forumId: forumId,
        })

        updateKey("messages", messageId, message);
      };
       
      const deleteMessage = (messageId) => {
        deleteFromKey("messages", messageId);
      };   
    
      const addReply = (newReply) => {
        const reply = ({
          replyText: newReply,
          userId: user.id,
          messageId: id,
        })
    
        addNestedKey("messages", id, "replies", reply);
      };
    
      const updateReply = (updatedReply, replyId) => {
        const reply = ({
          replyText: updatedReply,
          userId: user.id,
          messageId: id,
        })
    
        updateNestedKey("messages", id, "replies", replyId, reply);
      }

      const deleteReply = (replyId) => {
        deleteNestedKey("messages", id, "replies", replyId);
      };  

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
            <section className='reply-options'>
                <div
                    onClick={()=>setShowReplies(prev=>!prev)}
                >
                    {showReplies ? 
                        <FaMinusCircle /> : <FaPlusCircle />
                    }
                    <p>{`${replies.length} replies`}</p>
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
                                handleDelete={deleteReply}
                            />
                        )}
                    </div>
                </div>
            }
    </CardContainer>
    );
}

export default MessageCard;