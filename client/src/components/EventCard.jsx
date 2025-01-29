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

const EventCard = ({ id,  signups, title, descr, zipcode, eventDate, handleEventBtn}) => {
    const { user } = useContext(UserContext);
    const [showToast, setShowToast] = useState(false);

    const btnMapping = {
        signupEvent: 'Sign Up',
        cancelSignup: 'Remove Event',
        cancelEvent: 'Cancel Event'
    }

    const handleClick = () => {
        handleEventBtn(id);

        if (!user) {
            setShowToast(true);
        }
    }

    return (
        <StyledEventCard>
            <div 
                className="main-event"
                onClick={handleClick}
            >
                <span>{`${eventDate} | ${zipcode}`}</span>
                <label>{title}</label>
                <p>{descr}</p>
            </div>
            <div className="btn-container">
                <span>{`${signups.length} Currently Planning to Attend`}</span>
                <button onClick={handleClick}>{btnMapping[handleEventBtn.name]}</button>
                {showToast && <NotLoggedInToast onClose={()=>setShowToast(false)}/>}
            </div>
        </StyledEventCard>
    );
}

export default EventCard;