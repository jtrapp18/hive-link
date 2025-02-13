import React, {useContext} from 'react';
import NavBar from "./NavBar"
import MobileNavBar from './MobileNavBar';
import {WindowWidthContext} from "../context/windowSize";
import Headroom from 'react-headroom';
import styled from 'styled-components';
import Logo from './Logo';
import {UserContext} from '../context/userProvider'

const StyledHeadRoom = styled(Headroom)`

  .headroom {
    #logged-in {
      position: absolute;
      right: 10vw;
      top: 0;
      color: var(--honey);
    }

    #honeycomb {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 0;
    }  
  }
`

const StyledHeader = styled.div`
  width: 100%;
  height: var(--height-header);
  margin: 0;
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 1% 5%;
  align-items: end;
`

const Header = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const { user } = useContext(UserContext);
    
    return (
        <StyledHeadRoom>
          <StyledHeader>
            <Logo />
            {isMobile ? <MobileNavBar /> : <NavBar />}
          </StyledHeader>
            {!isMobile &&
              <img 
              id='honeycomb'
              src='images/honeycomb_side.png'
            />          
            }
            {user && !isMobile && <span id='logged-in'>{`Logged in as ${user.username}`}</span>}
        </StyledHeadRoom>
    );
}

export default Header;
