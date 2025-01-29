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

    .main-hive {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 80%;
        cursor: pointer;
        
        section {
            display: flex;
            flex-direction: column;
            padding: 2%;
            justify-content: center;

            h3 {
                font-size: clamp(1.2rem, 1.8vw, 1.8rem);
            }

            img {
                width: 60%;
            }

            .hive-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
    }
`

const QueenCard = ({ id}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function handleClick() {
        navigate(`/hive/${id}`);
    }

    return (
        <StyledQueenCard>
            <div 
                className="main-queen"
                onClick={handleClick}
            >
                <section>
                    <div>

                    </div>
                </section>  
            </div>
            <div className="btn-container">
                <NavLink
                    to={`/hive/${id}`}
                    className="nav-link"
                >
                  <button onClick={()=>setActiveTab('edit_details')}>Edit Details</button>    
                </NavLink>
            </div>
        </StyledQueenCard>
    );
}

export default QueenCard;