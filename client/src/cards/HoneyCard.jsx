import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import { StyledCard, Button } from '../MiscStyling';

const HoneyCard = ({ honey_pull, setActiveHoneyPull }) => {
    const { id, datePulled, weight } = honey_pull

    return (
        <StyledCard>
            <div 
                className="main-container"
            >
                <section className='img-section'>
                    <img
                        src='images/dripping_honeycomb.png'
                        alt='honey'
                    />
                </section>
                <section className='info-section'>
                    <div>
                        <label>Date: </label>
                        <p>{datePulled}</p>
                    </div>
                    <div>
                        <label>Weight: </label>
                        <p>{weight}</p>
                    </div>
                </section>  
            </div>
            <div className="bottom-container">
                <span>{`Honey Pull ID: ${id}`}</span>
                <Button onClick={()=>setActiveHoneyPull(honey_pull)}>Edit Details</Button> 
            </div>
        </StyledCard>
    );
}

export default HoneyCard;