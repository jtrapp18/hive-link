import { NavLink } from "react-router-dom";
import styled, {css} from "styled-components";
import { Link } from "react-scroll";

const StyledMenuItem = css`
  text-decoration: none;
  position: relative;
  padding: 0px 10px 0px 10px;
  cursor: pointer;
  margin: 0 5px 0 5px;
`;

const StyledNavigation = css`
  ${StyledMenuItem}
  
  &.active {
    text-decoration: overline;
    text-decoration-thickness: 2px;
    color: var(--honey);
  }

  &:hover {
    color: var(--yellow);
  }
`;

const StyledNavLink = styled(NavLink)`
  ${StyledNavigation}
`

const StyledLink = styled(Link)`
  ${StyledNavigation}
`

const StyledMain = styled.main`
  display: flex;
  background: ${(props) => props.theme.background};

  .main-content {
    margin: ${(props) => props.isMobile ? '0 0 20px 0' : '20px'};
  }

  .page-header {
    margin: 10px;
  }
`;

const StyledForm = styled.form`
  width: 500px;
  max-width: 90vw;
  padding: 50px;
  border: 3px double var(--yellow);

  h1 {
    padding: 5px;
    border-radius: 200px;
    text-align: center;
  }

  input, textarea, select {
    width: 100%;
    background: var(--yellow);
    color: black;
    padding: 5px;
  }

  textarea:hover, input:hover, select:hover {
    background: var(--honey);
  }

  div:not(:last-child) {
    margin-bottom: 12px;
  }
`

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  max-width: 100vw;
  justify-items: center;

  hr {
    width: 100%;
  }
`

const BorderGlow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 10px;

  /* Radial gradient for glow */
  background: radial-gradient(
    circle, 
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 0.9) 60%,
    rgba(0, 0, 0, 1) 100%
  );
`

export { StyledMenuItem, StyledNavLink, StyledLink, StyledMain, StyledForm, CardContainer, BorderGlow }