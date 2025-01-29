import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const StyledMain = styled.main`
  height: var(--size-body);
  padding: 0;
  margin: 0;
  background-image: None;

  h1 {
      font-size: 12vh;
      color: var(--honey);
    }

  h3 {
    color: var(--yellow);
  }

  img {
    height: 70%;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }

`;

function Home() {
  return (
    <StyledMain>
        <h1>Hive Link</h1>
        <h3>A Beekeeper Network for Building Healthier Hives</h3>
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
    </StyledMain>
  );
}

export default Home;