import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const StyledMain = styled.main`
  height: var(--size-body);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, var(--green), white);

  .carousel {
    height: 70%;
    width: 70%;
    max-height: 100vh;
  }

  .carousel-item {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .carousel-caption {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    top: var(--height-header);

    h1 {
      font-size: clamp(2rem, 6vw, 5rem);
      background: var(--dark-chocolate);
      color: var(--cookie);
      font-family: 'RubikMoonrocks';
      width: 100%;
      padding: 20px;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Home() {
  return (
    <StyledMain>
      <Carousel>
        <Carousel.Item>
          <Image
              src="/images/cookies_falling.png" // Provide the relative or absolute path to the image
              alt="First slide"
          />
          <Carousel.Caption>
            <h1>J&N Cookies</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </StyledMain>
  );
}

export default Home;