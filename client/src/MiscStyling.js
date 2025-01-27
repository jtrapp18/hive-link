import { NavLink } from "react-router-dom";
import styled, {css} from "styled-components";
import { Link } from "react-scroll";

const StyledMenuItem = css`
  text-decoration: none;
  position: relative;
  padding: 0px 10px 0px 10px;
  cursor: pointer;
`;

const StyledNavigation = css`
  ${StyledMenuItem}
  
  &.active {
    text-decoration: overline;
    text-decoration-thickness: 2px;
    color: var(--green);
  }

  &:hover {
    color: var(--cookie);
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


export { StyledMenuItem, StyledNavLink, StyledLink, StyledMain }