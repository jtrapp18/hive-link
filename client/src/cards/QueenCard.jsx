import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import { StyledCard, Button } from '../MiscStyling';

const QueenCard = ({ queen, setActiveQueen }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id, status, origin, species, dateIntroduced, replacementCause } = queen

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
                    <label>Status: </label>
                    <p>{status}</p>
                </div>
                <div>
                    <label>Origin: </label>
                    <p>{origin}</p>
                </div>
                <div>
                    <label>Species: </label>
                    <p>{species}</p>
                </div>
                <div>
                    <label>Introduced: </label>
                    <p>{dateIntroduced}</p>
                </div>
                </section>  
            </div>
            <div className="bottom-container">
                <span>{`Queen ID: ${id}`}</span>
                <Button onClick={()=>setActiveQueen(queen)}>Edit Details</Button> 
            </div>
        </StyledCard>
    );
}

export default QueenCard;