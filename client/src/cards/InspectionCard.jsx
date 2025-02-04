import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { StyledCard, Button } from '../MiscStyling';

const InspectionCard = ({ inspection, setActiveInspection}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id, honeyPullId, dateChecked, fate, hasChalkbrood, hasTwistedLarvae, varroaMiteCount } = inspection

    return (
        <StyledCard>
            <div
                className="main-container"
            >
                <section className='img-section'>
                    <img
                        src='images/leather_journal.png'
                        alt='leather journal'
                    />
                </section>
                <section className='info-section'>
                    <div>
                        <label>Date: </label>
                        <p>{dateChecked}</p>
                    </div>
                    <div>
                        <label>Fate: </label>
                        <p>{fate}</p>
                    </div>
                    <div>
                        <label>Twisted Larvae Seen: </label>
                        <p>{hasTwistedLarvae ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <label>Chalkbrood Seen: </label>
                        <p>{hasChalkbrood ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <label>Varroa Mites Seen: </label>
                        <p>{varroaMiteCount}</p>
                    </div>
                </section>  
            </div>
            <div className="bottom-container">
                <span>{`Inspection ID: ${id} | Honey Pull ID: ${honeyPullId}`}</span>
                <Button onClick={()=>setActiveInspection(inspection)}>Edit Details</Button>    
            </div>
        </StyledCard>
    );
}

export default InspectionCard;