import NavLinks from "./NavLinks"
import styled from "styled-components";

const StyledNavBar = styled.nav`
  width: 100%;
  height: var(--height-header);
  background: white;
`;

const LinkContainer = styled.div`
  color: black;
  padding: 0 10vw 2vh 0;
  text-decoration: none;
  text-align: right;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  & > .nav-link {
    font-size: clamp(1.5rem, 1.5vw, 2.5rem)
  }
`

function NavBar() {
  return (
    <StyledNavBar>
        <LinkContainer>
          <NavLinks/>
        </LinkContainer>
    </StyledNavBar>
  );
};

export default NavBar;