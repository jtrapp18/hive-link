import styled from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { StyledNavLink } from "../MiscStyling";
import { scrollToTop } from "../helper";
import { UserContext } from '../context/userProvider';
import { userLogout } from "../helper";

// Styled components

const StyledDiv = styled.div`
    height: var(--height-header);
    position: relative;
    background: white;
    display: flex;
`
const LinkContainer = styled.div`
  position: fixed;
  top: calc(var(--height-header) + 3px);
  height: 100vh;
  
  left: 0;
  z-index: 2000;
  width: 100vw;
  text-decoration: none;
  text-align: right;
  background: black;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures smooth animation */
  transform-origin: top; /* Animation starts at the top */
  transform: scaleY(0); /* Initially collapsed */
  transition: transform 0.3s ease-in-out; /* Smooth fold-out animation */

  a {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
  }

  &.open {
    transform: scaleY(1); /* Fully expanded */
  }

  &.closed {
    transform: scaleY(0); /* Fully collapsed */
  }

  #exit {
    background: var(--gray);
    span {
      cursor: pointer;
      padding: 5px;
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding-right: 10vw;
  transition: transform 1s ease;
  z-index: 1000;

  &:hover {
    background: None;
  }

  span {
    font-size: clamp(2rem, 4vw, 3rem);
    color: black;
  }

  @media (max-width: 768px) {
    display: block;
  }

  &.open {
    transform: rotate(45deg) translateX(30%);
  }

  .icon {
    display: inline-block;
    transition: transform 0.3s ease; /* Smooth transition for icon scale */

    /* Scale the icon to create a smooth change from ☰ to ✖ */
    &.open {
      transform: scale(1.1) rotate(45deg); /* Scale and rotate for the "X" */
    }
`;

// MobileNavBar Component
const MobileNavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null); // Create a reference to the card element

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClick = () => {
    scrollToTop();
    setIsMenuOpen(false); // Close menu after navigation
  };

  const handleAccountToggle = () => {
    if (user) {
      userLogout();
      setUser(null);
      setIsMenuOpen(false);
    }
    handleClick()
  }

  return (
    <StyledDiv
      ref={cardRef}
    >
      <LinkContainer 
        className={isMenuOpen ? "open" : "closed"}
      >
        <StyledNavLink
          to="/"
          className="nav-link"
          onClick={handleClick}
        >
          Home
        </StyledNavLink>
        <StyledNavLink
          to="/about"
          className="nav-link"
          onClick={handleClick}
        >
          About
        </StyledNavLink>
        <StyledNavLink
          to="/news"
          className="nav-link"
          onClick={handleClick}
        >
          News
        </StyledNavLink>
        <StyledNavLink
          to="/events"
          className="nav-link"
          onClick={handleClick}
        >
          Events
        </StyledNavLink>
        <StyledNavLink
          to="/hive_map"
          className="nav-link"
          onClick={handleClick}
        >
          Map
        </StyledNavLink>
        <StyledNavLink
          to="/analysis"
          className="nav-link"
          onClick={handleClick}
        >
          Analysis
        </StyledNavLink>
        <StyledNavLink
          to="/forums"
          className="nav-link"
          onClick={handleClick}
        >
          Forums
        </StyledNavLink>
        <StyledNavLink
          to="/account_details"
          className="nav-link"
          onClick={handleClick}
        >
          Account Details
        </StyledNavLink>
        <StyledNavLink
          to="/hives"
          className="nav-link"
          onClick={handleClick}
        >
          Manage Hives
        </StyledNavLink>
        <StyledNavLink
          to="/login"
          className="nav-link"
          onClick={handleAccountToggle}
          >
            {user ? 'Logout' : 'Login'}
        </StyledNavLink>
      </LinkContainer>
      <HamburgerButton 
        className={isMenuOpen ? "open" : ""} 
        onClick={toggleMenu}
        aria-label="Toggle Menu">
        <span className={`icon ${isMenuOpen ? "open" : ""}`}>
          {isMenuOpen ? "✕" : "☰"}
        </span>
      </HamburgerButton>
    </StyledDiv>
  );
};

export default MobileNavBar;