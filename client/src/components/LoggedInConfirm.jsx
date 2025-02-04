import React, { useState, useContext } from "react";
import { userLogout } from "../helper";
import styled from "styled-components";
import {UserContext} from '../context/userProvider';
import { NavLink } from "react-router-dom";
import { Button } from "../MiscStyling"

const StyledDiv = styled.div`
  max-width: 90vw;
  padding: 50px;

  a:hover {
    font-decoration: underline;
  }

  img {
    max-height: 30vh;
  }
`

function LoggedInConfirm({setShowConfirm}) {

  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    userLogout();
    setShowConfirm(false);
    setUser(null);
  }

  return (
    <StyledDiv>
      <p>{`Logged in as ${user.username}`}</p>
      <h1>{`Hello, ${user.firstName}!`}</h1>
      <img
          src='images/bee_flying.png'
          alt='welcome bee'
        />
      <NavLink
          to="/"
          className="nav-link"
        >
          continue to site    
        </NavLink>
      <NavLink
          to="/login"
          className="nav-link"
        >
        <Button onClick={handleLogout}>Log Out</Button>         
      </NavLink>
    </StyledDiv>
  );
}

export default LoggedInConfirm;