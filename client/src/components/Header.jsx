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
      right: 30px;
      top: 10px;
      color: var(--light-green);
    }
  }
`

const Header = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const { user } = useContext(UserContext);
    
    return (
        <StyledHeader>
          {user && <span id='logged-in'>{`Logged in as ${user.username}`}</span>}
          <Logo />
          {isMobile ? <MobileNavBar /> : <NavBar />}
        </StyledHeader>
    );
}

export default Header;
