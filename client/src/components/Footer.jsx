import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: black;

    img {
        height: 250px;
        width: 100%;
        object-fit: cover;
        object-position: top;
    }
`

const Footer = () => {

    return (
        <StyledFooter id="footer">
            <img
                src={'images/honeycomb_watercolor.png'}
                alt='Honeycomb watercolor'
            />
        </StyledFooter>
    );
}

export default Footer;
