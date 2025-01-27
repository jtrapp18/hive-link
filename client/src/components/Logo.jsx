import { StyledNavLink } from "../MiscStyling";
import styled from "styled-components";

const LogoContainer = styled.div` 
  text-align: left;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    height: clamp(2rem, 6vw, 4rem);
  }
`

function Logo() {


  return (
      <LogoContainer>
        <StyledNavLink
          to="/"
          className="home"
        >
          <img src={`images/cookie-store-logo.png`} alt="home"/>
        </StyledNavLink>
      </LogoContainer>
  );
};

export default Logo;