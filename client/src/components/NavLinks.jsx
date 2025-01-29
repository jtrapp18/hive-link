import { useState } from "react";
import { StyledMenuItem, StyledNavLink } from "../MiscStyling";
import { FaUserAlt } from 'react-icons/fa'; // Import icons
import AccountDropdown from "./AccountDropdown";
import styled from "styled-components";

const StyledAccountIcon = styled.div`
  ${StyledMenuItem}
  position: relative;
  z-index: 1000;
`


function NavLinks({ handleClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <StyledNavLink
        to="/analysis"
        className="nav-link"
        onClick={handleClick}
      >
        Analysis
      </StyledNavLink>
      <StyledAccountIcon
        className="nav-link"
        onMouseOver={()=>setIsMenuOpen(true)}
        onMouseOut={()=>setIsMenuOpen(false)}
      >
        <FaUserAlt />
      </StyledAccountIcon>
      <AccountDropdown 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </>
  );
};

export default NavLinks;