import { NavLink } from "react-router-dom";
import styled, {css} from "styled-components";
import { Link } from "react-scroll";

const StyledMenuItem = css`
  text-decoration: none;
  position: relative;
  padding-left: 3vw;
  cursor: pointer;
  display: flex;
  align-items: center;
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
  min-height: var(--size-body);
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Background image */
  background-image: ${(props) => props.isMobile ? 'none' : `url('/images/grid_left.png')`};
  background-size: auto 40vh;
  background-position: top left;
  background-repeat: no-repeat;
`;

const StyledForm = styled.form`
  width: 600px;
  max-width: 75vw;
  padding: 2%;
  overflow-y: auto;

  h1 {
    padding: 5px;
    border-radius: 200px;
    text-align: center;
  }

  input, textarea, select, option {
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

  span {
    color: gray;
  }

  .submit-error {
    cursor: pointer;
  }
`

const StyledSubmit = styled.div`
  width: 650px;
  max-width: 75vw;
  padding: 2%;
  display: flex;
  flex-direction: column;

  h1 {
    padding: 5px;
    border-radius: 200px;
    text-align: center;
  }

  p {
    color: var(--yellow);
  }

  div {
    display: flex;
    border-bottom: 2px dotted gray;
    justify-content: space-between;
    margin: 10px 5px 0px 5px;
    padding: 20px 5px 0px 5px;
  }
`

const StyledDeleted = styled.div`
  width: fit-content;
  max-width: 90vw;
  padding: 50px;
  display: flex;
  flex-direction: column;

  h2 {
    padding: 5px;
    border-radius: 200px;
    text-align: center;
    color: red;
  }

  div {
    display: flex;
    border-bottom: 2px dotted gray;
    justify-content: space-between;
    margin: 10px 5px 0px 5px;
    padding: 20px 5px 0px 5px;
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

  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
`

const Button = styled.button`
  color: black;
  background: var(--yellow);
  min-width: 100px;
  height: fit-content;

  &:hover {
    background: var(--honey);
    font-weight: bold;
  }
`

const HexagonButton = styled.button`
  position: relative;
  width: ${props => props.isMobile ? '80px' : '100px'}; // Shrinks size on mobile
  height: ${props => props.isMobile ? '46px' : '58px'}; // Adjust height proportionally
  border: none;
  cursor: pointer;
  outline: none;
  font-size: ${props => props.isMobile ? '12px' : '16px'}; // Smaller font on mobile
  text-align: center;
  line-height: ${props => props.isMobile ? '46px' : '58px'}; // Adjust line-height proportionally
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  border-left: 1px solid black;
  background-color:  ${props=> props.isActive ? 'var(--yellow)' : 'var(--honey)'};
  margin: ${props => props.isMobile ? '15px 0' : '30px 0'};

  &:hover {
    font-weight: bold;
  }
  
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    border-left: ${props => props.isMobile ? '40px' : '50px'} solid transparent; // Shrinks the triangle size
    border-right: ${props => props.isMobile ? '40px' : '50px'} solid transparent;
  }

  &:before {
    top: calc(-1 * ${props => props.isMobile ? '23px' : '29px'} + 1px); /* Slight overlap */
    border-bottom: ${props => props.isMobile ? '23px' : '29px'} solid ${props => props.isActive ? 'var(--yellow)' : 'var(--honey)'};
  }

  &:after {
    bottom: calc(-1 * ${props => props.isMobile ? '23px' : '29px'} + 1px); /* Slight overlap */
    border-top: ${props => props.isMobile ? '23px' : '29px'} solid ${props => props.isActive ? 'var(--yellow)' : 'var(--honey)'};
  }
`;

const HexButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px 0;
`

const StyledCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;
    
    border: ${props => props.active ? '1px solid white' : 'none'};

    .current-round {
      position: absolute;
      right: 0;
      top: -3%;
    }

    .bottom-container {
        padding-top: 2%;
        border-top: 3px double var(--honey);
        justify-content: space-between;
        display: flex;

        span {
          color: gray;
        }
    }

    .main-container {
        position: relative;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        &:hover {
            background: var(--dark-gray);
            border-radius: 5px;
        }

        .info-section {
            // min-width: 40%;
            width: fit-content;
            white-space: nowrap;
            div {
                display: flex;
                align-items: center;

                p {
                    margin: 2%;
                    color: var(--yellow);
                }
            }
        }
        
        section {
            display: flex;
            flex-direction: column;
            padding: 2%;
            justify-content: center;

            h3 {
                font-size: clamp(1.2rem, 1.8vw, 1.8rem);
            }
            
            span {
                color: var(--honey);
            }

            img {
                width: 60%;
            }
        }
    }
`

const PlotContainer = styled.div`
  display: grid;
  height: 400px;
  max-height: 90vh;
  background: white;
  cursor: pointer;
  border: 3px solid var(--honey);
  margin: 1%;

  p {
    color: black;
  }

  h3 {
    text-align: center;
    text-decoration: underline;
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
  }

  .gtitle {
    text-decoration: underline;
    font-weight: bold;
    color: white;
    font-size: var(--default-size);
  }
`;

const StyledContainer = styled.div`
    width: 1000px;
    max-width: 98vw;
    margin: 0;
    padding: 0% 5%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      text-align: center;
      padding-top: 2vh;
    }

    hr {
      width: 100%;
    }
`

const StyledAnalysis = styled(StyledContainer)`
    display: grid;
    h2, span {
      text-align: center;
    }

    span {
      color: var(--honey);
    }

    .graph-container {
        display: grid;
        height: auto;
        text-align: center;
        width: 90vw;
        place-content: center;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));

        @media (max-width: 768px) {  /* Mobile screens */
          grid-template-columns: repeat(auto-fit, minmax(90vw, 1fr)); /* Adjust grid items to take up 90% of the viewport width on mobile */
        }
    }
`

const GraphSectionHeader = styled.div`
  width: 100%;
  align-items: center;
  place-items: center;
  display: grid;

  hr {
    border: 1px solid var(--honey);
    padding: 0;
    color: white;
    width: 90%;
  }

  h3 {
    color: var(--honey);
    text-align: center;
    margin: 0;
  }
`;

const Tag = styled.div`
  background: gray;
  border-radius: 5px;
  padding: 5px;
  color: white;
  width: fit-content;
`

export { StyledMenuItem, StyledNavLink, StyledLink, StyledMain, StyledForm, 
  StyledSubmit, StyledDeleted, CardContainer, BorderGlow, Button, 
  HexagonButton, HexButtonContainer, StyledCard, StyledContainer, StyledAnalysis, PlotContainer, 
  GraphSectionHeader, Tag }