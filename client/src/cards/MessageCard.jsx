import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import styled from 'styled-components';

const Message = styled.div`
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
    }

    span {
        color: gray;
    }  

    section {
        border: 1px solid var(--honey);
        padding: 10px;
        border-radius: 20px;
        background: white;

        p {
            color: black;
        }
    }
`

const MessageCard = ({ id,  userId, user: msgUser, messageDate, messageText}) => {
    const { user } = useContext(UserContext);
    const myMessage = userId===user.id
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(prev=>!prev)
    }

    const formattedTime = new Date(messageDate).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });

    return (
        <Message className={myMessage ? 'self' : ''}>
            <div className='message-main'>
                <div className='message-info'>
                    <span>{msgUser.username} | {formattedTime}</span>
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
                            <button>Delete Message</button>
                        </div>
                    }
                </div>
                <section>
                    <p>{messageText}</p>
                </section>
            </div>
        </Message>
    );
}

export default MessageCard;