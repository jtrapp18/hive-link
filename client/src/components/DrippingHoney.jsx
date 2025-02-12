import { useContext } from 'react';
import styled from 'styled-components';

const StyledHoney = styled.img`
    position: absolute;
    top: 0;
    right: calc(500px - 50vw);
    width: 275px;
    max-width: 20vw;
    animation: slideDown 4s ease-out forwards;

    @media (max-width: 1000px) {
        right: 0px;
    }
`
 
const DrippingHoney = () => {

    return (
        <StyledHoney 
            src='/images/dripping_honey.png'
            alt='dripping honey'
        />
    );
}

export default DrippingHoney;
