import styled from 'styled-components';

const StyledHoney = styled.img`
    position: fixed;
    right: 5%;
    top: 0;
    width: 20vw;
    animation: slideDown 4s ease-out forwards;
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
