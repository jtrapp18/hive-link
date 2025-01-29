import React, {useContext} from 'react';
import NavBar from "./NavBar"
import MobileNavBar from './MobileNavBar';
import {WindowWidthContext} from "../context/windowSize";
import Headroom from 'react-headroom';
import styled from 'styled-components';
import Logo from './Logo';
import {UserContext} from '../context/userProvider'

const StyledHeader = styled(Headroom)`
  padding: 0;
  margin: 0;

  .headroom {
    display: flex;
    justify-content: space-between;
    background: white;
    height: var(--height-header);

    #logged-in {
      position: absolute;
      right: 10vw;
      top: 0;
      color: var(--honey);
    }
  }

  #honeycomb {
    height: 100%;
    position: absolute;
    right: 0;
  }
`

const Header = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const { user } = useContext(UserContext);
    
    return (
        <StyledHeader>
          <Logo />
          {isMobile ? <MobileNavBar /> : <NavBar />}
          <img 
            id='honeycomb'
            src='images/honeycomb_side.png'
          />
          {user && <span id='logged-in'>{`Logged in as ${user.username}`}</span>}
        </StyledHeader>
    );
}

export default Header;
