import styled from "styled-components";
import { NavLink } from "react-router-dom";

const LogoContainer = styled.div` 
  height: 100%;
  display: flex;
  align-items: end;

  img {
    height: clamp(2rem, 7vw, 4.2rem);
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.3);
    }
  }
`

function Logo() {


  return (
      <LogoContainer>
        <NavLink
          to="/"
          className="home"
        >
          <img src={`images/bee_logo.png`} alt="home"/>
        </NavLink>
      </LogoContainer>
  );
};

export default Logo;