import { useContext, useState } from "react";
import { StyledMenuItem, StyledNavLink } from "../MiscStyling";
import { UserContext } from '../context/userProvider';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa'; // Import icons
import { Badge } from 'react-bootstrap'; // For cart item count badge
import AccountDropdown from "./AccountDropdown";
import styled from "styled-components";

const StyledAccountIcon = styled.div`
  ${StyledMenuItem}
  position: relative;
`


function NavLinks({ handleClick }) {
  const { cartOrder } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
 
  // const toggleMenu = () => {
  //   setIsMenuOpen((prev) => !prev);
  // };


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