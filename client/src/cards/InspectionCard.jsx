import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { StyledCard, Button } from '../MiscStyling';

const InspectionCard = ({ inspection, setActiveInspection}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id, queenId, dateChecked, fate, chalkbroodPresence, varroaMites } = inspection

    return (
        <StyledCard>
            <div 
                className="main-container"
            >
                <section className='img-section'>
                    <img
                        src='images/queen_bee.png'
                        alt='queen bee'
                    />
                </section>
                <section className='info-section'>
                    <div>
                        <label>Date: </label>
                        <p>{dateChecked}</p>
                    </div>
                    <div>
                        <label>Latitude: </label>
                        <p>{fate}</p>
                    </div>
                    <div>
                        <label>Chalkbrood Seen: </label>
                        <p>{chalkbroodPresence ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <label>Varroa Mites Seen: </label>
                        <p>{varroaMites ? "Yes" : "No"}</p>
                    </div>
                </section>  
            </div>
            <div className="bottom-container">
                <span>{`Inspection ID: ${id}`}</span>
                <Button onClick={()=>setActiveInspection(inspection)}>Edit Details</Button>    
            </div>
        </StyledCard>
    );
}

export default InspectionCard;