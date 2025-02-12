import { useState } from "react";
import NavLinks from "./NavLinks"
import styled from "styled-components";
import AccountDropdown from "./AccountDropdown";

const StyledNavBar = styled.nav`
  color: black;
  display: flex;
  height: fit-content;

  & > .nav-link {
    font-size: clamp(1.5rem, 1.5vw, 2.5rem)
  }

`;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <StyledNavBar>
        <NavLinks
          setIsMenuOpen={setIsMenuOpen}
        />
        <AccountDropdown 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
    </StyledNavBar>
  );
};

export default NavBar;