import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;

    img {
        width: 100%;
    }
`

const Footer = () => {

    return (
        <StyledFooter id="footer">
            <img
                src={'images/cookies.png'}
                alt='Chocolate chip cookies'
            />
        </StyledFooter>
    );
}

export default Footer;
