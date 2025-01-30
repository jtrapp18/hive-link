import { useContext, useState } from 'react';
import styled from "styled-components";
import {UserContext} from '../context/userProvider'
import NotLoggedInToast from './NotLoggedInToast'

const StyledEventCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);

    .btn-container {
        padding-top: 2%;
        border-top: 3px double var(--honey);
        justify-content: space-between;
        display: flex;

        span {
            background: gray;
            border-radius: 5px;
            padding: 5px;
        }
    }

    .main-event {
        cursor: pointer;

        span {
            color: gray;
        }
    }
`

const EventCard = ({ event, handleEventBtn}) => {
    const { user } = useContext(UserContext);
    const [showToast, setShowToast] = useState(false);
    const { id,  signups, title, descr, zipcode, eventDate } = event

    const btnMapping = {
        signupEvent: 'Sign Up',
        cancelSignup: 'Remove Event',
    }

    const handleClick = () => {
        handleEventBtn(event);

        if (!user) {
            setShowToast(true);
        }
    }

    return (
        <StyledEventCard>
            <div 
                className="main-event"
            >
                <span>{`${eventDate} | ${zipcode}`}</span>
                <label>{title}</label>
                <p>{descr}</p>
            </div>
            <div className="btn-container">
                <span>{`${signups.length} Currently Planning to Attend`}</span>
                <button onClick={handleClick}>{btnMapping[handleEventBtn.name] || "Manage Event"}</button>
                {showToast && <NotLoggedInToast onClose={()=>setShowToast(false)}/>}
            </div>
        </StyledEventCard>
    );
}

export default EventCard;