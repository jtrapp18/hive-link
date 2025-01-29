import { useContext, useState} from 'react';
import styled from "styled-components";
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import HiveCard from '../components/HiveCard';
import {UserContext} from '../context/userProvider'
import Login from './Login';
import Error from "../styles/Error";
import { CardContainer } from '../MiscStyling';

const Hives = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const { hives } = useOutletContext();

  if (!user) return <><Error>Must be logged in to view hives</Error><Login /></>

  const userHives = hives.filter((hive) => hive.userId === user.id)

  return (
      <main>
        <h1>My Hives</h1>
        <CardContainer>
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
  