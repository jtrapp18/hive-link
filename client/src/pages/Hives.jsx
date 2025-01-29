import { useContext, useState} from 'react';
import styled from "styled-components";
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import HiveCard from '../components/HiveCard';
import {UserContext} from '../context/userProvider'
import Login from './Login';

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .filter-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // overflow: scroll;
  }
}
`

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 10px;
  max-width: 100vw;
  justify-items: center;
`

const Hives = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const { hives } = useOutletContext();

  if (!user) return <Login />

  const userHives = hives.filter((hive) => hive.userId === user.id)

  return (
      <StyledMain>
        <CardContainer>
          {userHives.map(hive=>
            <HiveCard
                key={hive.id}
                {...hive} 
            />
          )}
        </CardContainer>
      </StyledMain>
    );
  };
  
  export default Hives;
  