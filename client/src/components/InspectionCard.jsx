import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';

const StyledInspectionCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);

    .btn-container {
        height: 15%;
        padding-top: 2%;
        border-top: 3px double var(--honey);
        justify-content: end;
        display: flex;
    }
`

const InspectionCard = ({ inspection, setActiveInspection}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id, queenId, dateChecked, fate, chalkbroodPresence, varroaMites } = inspection

    return (
        <StyledInspectionCard>
            <div 
                className="main-queen"
            >
                <p>{id}</p>
                <p>{queenId}</p>
                <p>{dateChecked}</p>     
                <p>{fate}</p>     
                <p>{chalkbroodPresence}</p>     
                <p>{varroaMites}</p>  
            </div>
            <div className="btn-container">
                <button onClick={()=>setActiveInspection(inspection)}>Edit Details</button>    
            </div>
        </StyledInspectionCard>
    );
}

export default InspectionCard;