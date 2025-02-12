import styled from "styled-components";
import { useContext, useRef } from "react";
import { scrollToTop } from "../helper";
import { UserContext } from '../context/userProvider';
import { NavLink } from "react-router-dom";
import { userLogout } from "../helper";

const LinkContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  width: 20%;
  text-decoration: none;
  text-align: right;
  background: var(--yellow);
  border: 1px solid black;
  border-bottom: 3px double black;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures smooth animation */
  transform-origin: top; /* Animation starts at the top */
  transform: scaleY(0); /* Initially collapsed */
  transition: transform 0.3s ease-in-out; /* Smooth fold-out animation */

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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  position: relative;
  cursor: pointer;
  padding: 10px;
  font-size: clamp(1.2rem, 1.5vw, 2.2rem);

  height: 10vh;
  justify-content: end;
  font-size: var(--default-font-size);
  align-items: center;
  display: flex;

  &.active {
    text-decoration: overline;
    text-decoration-thickness: 2px;
    color: black;
  }

  &:hover {
    color: var(--honey);
    background: black;
    border: 1px solid var(--honey);
  }
`

const AccountDropdown = ({isMenuOpen, setIsMenuOpen}) => {
  const { user, setUser } = useContext(UserContext);

  const cardRef = useRef(null);

  const handleAccountToggle = () => {
    if (user) {
      userLogout();
      setUser(null);
      setIsMenuOpen(false);
    }
  }

  const handleClick = () => {
    scrollToTop();
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
      <LinkContainer 
        ref={cardRef}
        onMouseOver={()=>setIsMenuOpen(true)}
        onMouseOut={()=>setIsMenuOpen(false)}
        className={isMenuOpen ? "open" : "closed"}
      >
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
  );
};

export default AccountDropdown;