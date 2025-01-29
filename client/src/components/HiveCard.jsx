import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import Button from 'react-bootstrap/Button';
import { FaCartPlus, FaRegHeart } from 'react-icons/fa';
import NotLoggedInToast from './NotLoggedInToast';

const StyledHiveCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);
    border-radius: 10px;  
    background: var(--light-green);

    .btn-container {
        height: 15%;
        padding-top: 2%;
        border-top: 3px double var(--dark-chocolate);
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

            .hive-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
    }
`

const HiveCard = ({ id,  dateAdded, material, locationLat, locationLong, queens, inspections}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function handleClick() {
        navigate(`/hive/${id}`);
    }

    return (
        <StyledHiveCard className="hive-card">
            <div 
                className="main-hive"
                onClick={handleClick}
            >
                <section>
                    <div className="hive-info">
                        <h2>{id}</h2>
                        <p>{material}</p>
                        <p>{dateAdded}</p>
                        <p>{locationLat}</p>
                        <p>{locationLong}</p>
                    </div>
                </section>    
            </div>
            {cartItems &&
                <div className="btn-container">
                    <Button variant="outline-danger">Add Inspection</Button>
                    <Button variant="outline-danger">Add Queen</Button>
                    <Button variant="outline-danger">Edit Details</Button>
                </div>
            }    
        </StyledHiveCard>
    );
}

export default HiveCard;