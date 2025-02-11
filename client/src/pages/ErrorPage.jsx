import styled from 'styled-components';
import { NavLink } from "react-router-dom";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  display: flex;

  /* Background image */
  background-image: url('/images/swarm.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  div {
    padding: 2%;
    text-align: center;

    h3 {
        font-size: clamp(4.5rem, 5.5vw, 6rem);
        text-shadow: 1px 1px 2px black;
      }

    a {
        font-size: clamp(3rem, 3vw, 4rem);
        text-shadow: 1px 1px 2px black;
        color: #0096FF;
    }

    a:hover {
        text-decoration: underline;
        color: var(--bright-blue);
    }
  }
`;

function ErrorPage() {
  return (
    <StyledContainer>
        <div>
          <h3>An error has occured!</h3>
        <NavLink
            to="/"
            className="nav-link"
            >
            continue to site    
        </NavLink>
        </div>
    </StyledContainer>
  );
}

export default ErrorPage;