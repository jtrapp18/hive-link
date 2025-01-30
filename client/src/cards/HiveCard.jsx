import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import { Button } from '../MiscStyling';

const StyledHiveCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);

    .label-container {
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
            
            span {
                color: var(--honey);
            }

            img {
                width: 60%;
            }
        }
    }
`

const HiveCard = ({ id,  dateAdded, material, locationLat, locationLong, queens, inspections, setActiveTab}) => {
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
                <section className='img-section'>
                    <img
                        src='images/hive.png'
                        alt='bee hive'
                    />
                </section>
                <section className='info-section'>
                    <div>
                        <label>Material:</label>
                        <p>{material}</p>
                        <label>Added:</label>
                        <p>{dateAdded}</p>
                        <label>Latitude:</label>
                        <p>{locationLat}</p>
                        <label>Longitude:</label>
                        <p>{locationLong}</p>
                    </div>
                </section>  
            </div>
            <div className="label-container">
                <span>{`Hive ID: ${id}`}</span>
            </div>
        </StyledHiveCard>
    );
}

export default HiveCard;