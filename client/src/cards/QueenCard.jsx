import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import { Button } from '../MiscStyling';

const StyledQueenCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;

    .btn-container {
        // height: 15%;
        padding-top: 2%;
        border-top: 3px double var(--honey);
        justify-content: end;
        display: flex;
    }

    .main-queen {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 80%;
    }
`

const QueenCard = ({ queen, setActiveQueen }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id, status, origin, species, dateIntroduced, replacementCause } = queen

    return (
        <StyledQueenCard>
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
            <div>
                <label>Replacement Cause: </label>
                <p>{replacementCause}</p>
            </div>
            <div className="btn-container">
                <span>{`Queen ID: ${id}`}</span>
                <Button onClick={()=>setActiveQueen(queen)}>Edit Details</Button>
            </div>
        </StyledQueenCard>
    );
}

export default QueenCard;