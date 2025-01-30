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

const Hives = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const { hives } = useOutletContext();
  const {PopupForm: HivePopup, setShowNewForm: setShowNewHive} = usePopupForm(HiveForm);

  if (!user) return <Login errMessage="Must be logged in to view hives"/>

  const userHives = hives.filter((hive) => hive.userId === user.id)

  return (
      <main>
        <h1>My Hives</h1>
        <CardContainer>
          <button onClick={()=>setShowNewHive(true)}>Add New Hive</button>
          <HivePopup />
          {userHives.map(hive=>
            <HiveCard
                key={hive.id}
                {...hive}
            />
          )}
        </CardContainer>
      </main>
    );
  };
  
  export default Hives;
  