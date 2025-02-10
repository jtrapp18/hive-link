import { useContext, useState} from 'react';
import styled from "styled-components";
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import HiveCard from '../cards/HiveCard';
import {UserContext} from '../context/userProvider'
import Login from './Login';
import Error from "../styles/Error";
import { CardContainer } from '../MiscStyling';
import usePopupForm from '../hooks/usePopupForm';
import HiveForm from '../forms/HiveForm'
import { Button } from '../MiscStyling';
import { StyledContainer } from '../MiscStyling';
import MotionWrapper from '../styles/MotionWrapper';

const Hives = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const { hives } = useOutletContext();
  const {PopupForm, setShowNewForm, setActiveItem} = usePopupForm(HiveForm);

  if (!user) return <Login errMessage="Must be logged in to view hives"/>

  const viewHive = (hive) => {
    setShowNewForm(false);
    setActiveItem(hive);
  }

  return (
      <StyledContainer>
        <h1>My Hives</h1>
        <p>Click on any hives to manage details</p>
        <h3>. . . . . </h3>
        <Button onClick={()=>setShowNewForm(true)}>Add New Hive</Button>        
        <br />
        <CardContainer>
          <PopupForm
            viewHive={viewHive}
          />
          {hives.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .map((hive, index)=>
            <MotionWrapper index={index}>
              <HiveCard
                  key={hive.id}
                  {...hive}
              />
            </MotionWrapper>
          )}
        </CardContainer>
      </StyledContainer>
    );
  };
  
  export default Hives;
  