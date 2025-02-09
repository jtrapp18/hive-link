import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';
import { formattedTime } from '../helper';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import NewMessage from '../forms/NewMessage';

const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 10px;
    width: 100%;

    .message-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .option-dots {
            cursor: pointer;
            color: var(--honey);
        }

        .options-container {
            display: flex;
            flex-direction: column;
            position: absolute;
            right: 0;
            top: 100%;

            button {
                background: var(--yellow);
                border: 1px solid var(--honey);
            }
        }
    }

    .message-main {
        width: 80%;
    }

    &.self {
        align-items: end;

        .message-bubble {
            background: var(--light-gray);        
        }
    }

    span {
        color: gray;
    }  

    .message-bubble {
        border: 1px solid var(--honey);
        padding: 10px;
        border-radius: 20px;
        background: white;

        p {
            color: black;
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

const Message = ({ id,  userId, msgUser, messageDate, messageText, handleUpdate, handleDelete}) => {
    const { user } = useContext(UserContext);
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editMsg, setEditMsg] = useState(messageText);

    const toggleOptions = () => {
        setShowOptions(prev=>!prev)
    }

    const submitEdit = () => {
        handleUpdate(editMsg);
    }

    const submitDelete = () => {
        handleDelete(id);
    }

    const handleChange = (e) => {
        setEditMsg(e.target.value);
      };

    const myMessage = !user ? false : userId===user.id

    return (
        <StyledMessage className={myMessage ? 'self' : ''}>
            <div className='message-main'>
                <div className='message-info'>
                    <span>{msgUser.username} | {formattedTime(messageDate)}</span>
                    {myMessage &&
                        <h3
                            className='option-dots'
                            onClick={toggleOptions}
                        >
                            ...
                        </h3>                    
                    }
                    {showOptions &&
                        <div className='options-container'>
                            <button>Edit Message</button>
                            <button onClick={submitDelete}>Delete Message</button>
                        </div>
                    }
                </div>
                <section className='message-bubble'>
                    {editMode ?
                        <textarea
                            id="messageText"
                            name="messageText"
                            value={formData.messageText}
                            onChange={handleChange}
                        /> :
                        <p>{messageText}</p>
                    }
                </section>
            </div>
        </StyledMessage>
    );
}

export default Message;