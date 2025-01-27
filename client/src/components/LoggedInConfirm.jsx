import React, { useState, useContext } from "react";
import { userLogout } from "../helper";
import styled from "styled-components";
import {UserContext} from '../context/userProvider';
import { NavLink } from "react-router-dom";

const StyledDiv = styled.div`
  max-width: 90vw;
  background: var(--cookie);
  padding: 50px;
  border: 3px double var(--dark-chocolate);
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
      <h1>{`Hello, ${user.first_name}!`}</h1>
      <p>{`Logged in as ${user.username}`}</p>
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