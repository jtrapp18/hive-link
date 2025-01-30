import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import Button from 'react-bootstrap/Button';
import NotLoggedInToast from './NotLoggedInToast';
import { NavLink } from 'react-router-dom';

const StyledQueenCard = styled.article`
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
    const { id } = queen

    return (
        <StyledQueenCard>
            <div 
                className="main-queen"
            >
            </div>
                <p>{id}</p>
            <div className="btn-container">
                <button onClick={()=>setActiveQueen(queen)}>Edit Details</button>
            </div>
        </StyledQueenCard>
    );
}

export default QueenCard;