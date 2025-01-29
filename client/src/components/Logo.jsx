import { StyledNavLink } from "../MiscStyling";
import styled from "styled-components";

const LogoContainer = styled.div` 
  text-align: left;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 0 3vw;

  img {
    height: clamp(2rem, 7vw, 4.2rem);
  }
`

function Logo() {


  return (
      <LogoContainer>
        <StyledNavLink
          to="/"
          className="home"
        >
          <img src={`images/bee_logo.png`} alt="home"/>
        </StyledNavLink>
      </LogoContainer>
  );
};

export default Logo;