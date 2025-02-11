import styled from 'styled-components';
import MotionWrapper from '../styles/MotionWrapper'

const StyledContainer = styled.div`
  height: var(--size-body);
  padding: 0;
  margin: 0;
  width: 100vw;

  div {
    padding: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h1 {
        font-size: clamp(4.5rem, 5.5vw, 6rem);
        color: var(--honey);
      }

    h3 {
      color: var(--yellow);
    }  
  }

  img {
    height: 70%;
    width: 100%;
    object-fit: cover;
    object-position: top;
    opacity: 0;
    animation: fadeIn 3s ease-in-out forwards;
  }

`;

function Home() {
  return (
    <StyledContainer>
        <MotionWrapper index={1}>
          <h1>Hive Link</h1>
        </MotionWrapper>
        <MotionWrapper index={2}>
          <h3>A Beekeeper Network Focused on Building Healthier Hives</h3>
        </MotionWrapper>
        <img
            src="/images/bee_analysis.jpeg" // Provide the relative or absolute path to the image
            alt="First slide"
        />
    </StyledContainer>
  );
}

export default Home;