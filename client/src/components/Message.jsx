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

    .message-bubble, .message-editing {
        border: 1px solid var(--honey);
        padding: 10px;
        border-radius: 20px;
        background: white;

        p {
            color: black;
        }
    }

    .message-editing {
        // background: var(--yellow);
        color: black;
        width: 100%;
        border: 3px solid var(--honey);
        height: fit-content;
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
    const [cancelConfirm, setCancelConfirm] = useState(false);
    const [editMsg, setEditMsg] = useState(messageText);

    const toggleOptions = () => {
        setShowOptions(prev=>!prev)
    }

    const submitEdit = () => {
        handleUpdate(editMsg, id);
        setEditMode(false);
        setShowOptions(false);
    }

    const submitDelete = () => {
        handleDelete(id);
        setCancelConfirm(false);
        setShowOptions(false);
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
                    {showOptions && !editMode && !cancelConfirm &&
                        <div className='options-container'>
                            <button onClick={()=>setEditMode(true)}>Edit Message</button>
                            <button onClick={()=>setCancelConfirm(true)}>Delete Message</button>
                        </div>
                    }
                    {editMode &&
                        <div className='options-container'>
                            <button onClick={submitEdit}>Confirm Changes</button>
                            <button onClick={()=>setEditMode(false)}>Cancel</button>
                        </div>
                    }
                    {cancelConfirm &&
                        <div className='options-container'>
                            <button onClick={submitDelete}>Confirm Delete</button>
                            <button onClick={()=>setCancelConfirm(false)}>Cancel</button>
                        </div>
                    }
                </div>
                {editMode ?                           
                    <textarea
                        id="messageText"
                        className='message-editing'
                        name="messageText"
                        value={editMsg}
                        onChange={handleChange}
                    /> :             
                    <section className='message-bubble'>
                        <p>{messageText}</p>
                    </section>
                }
            </div>
        </StyledMessage>
    );
}

export default Message;