import React, { useState, useContext } from "react";
import { userLogout } from "../helper";
import styled from "styled-components";
import {UserContext} from '../context/userProvider';
import { NavLink } from "react-router-dom";

const StyledDiv = styled.div`
  max-width: 90vw;
  padding: 50px;

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
      <NavLink
          to="/"
          className="nav-link"
        >
          <img
            src='images/welcome_bee.png'
            alt='welcome bee'
          />        
        </NavLink>
      <NavLink
          to="/login"
          className="nav-link"
        >
          <button onClick={handleLogout}>Log Out</button>         
        </NavLink>
    </StyledDiv>
  );
}

export default LoggedInConfirm;