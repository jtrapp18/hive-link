import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const StyledContainer = styled.div`
  height: var(--size-body);
  padding: 0;
  margin: 0;
  width: 100vw;
  background-image: None;

  div {
    padding: 2%;
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
    animation: fadeIn 1s ease-in-out forwards;
  }

`;

function Home() {
  return (
    <StyledContainer>
        <div>
          <h1>Hive Link</h1>
          <h3>A Beekeeper Network Focused on Building Healthier Hives</h3>
        </div>
        {/* "Stronger Together, Like the Hive."
        "Working Together, Thriving Together."
        "In Unity, the Hive Thrives."
        "Collaboration Fuels the Hive."
        "Like Bees, We Flourish Together." */}
        {/* <h3>Together, We Strengthen the Hive.</h3> */}
        <img
            src="/images/bee_analysis.jpeg" // Provide the relative or absolute path to the image
            alt="First slide"
        />
    </StyledContainer>
  );
}

export default Home;