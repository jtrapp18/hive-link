import styled from 'styled-components';
import MotionWrapper from '../styles/MotionWrapper'

const StyledContainer = styled.div`
  height: var(--size-body);
  padding: 0;
  margin: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    padding: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 95vw;

    h1 { 
        font-size: clamp(3rem, 10vw, 6rem);
        color: var(--honey);
      }

    h3 {
      font-size: clamp(1.2rem, 1.8vw, 1.8rem);
      color: var(--yellow);
      margin: 1%;
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
          <h3>Where Beekeepers work together to build healthier hives</h3>
        </MotionWrapper>
        <img
            src="/images/bee_analysis.jpeg" // Provide the relative or absolute path to the image
            alt="First slide"
        />
    </StyledContainer>
  );
}

export default Home;