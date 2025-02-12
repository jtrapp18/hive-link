import styled from 'styled-components';

const Hexagons = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: end;  
  right: calc(500px - 50vw);

  img {
    width: 20vw;
    animation: slideDiagonal .5s ease-out forwards;    
  }

  @media (max-width: 1000px) {
    right: 0px;
  }
`;
 
const HexagonDesign = () => {

    return (
        <Hexagons>
            <img
                src='/images/hexagon_design.png'
                alt='hexagon pattern'
            />
        </Hexagons>
    );
}

export default HexagonDesign;
