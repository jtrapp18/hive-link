import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: black;

    img {
        // height: 250px;
        width: 100%;
        object-fit: cover;
        object-position: top;
    }
    
    section {
        position: absolute;
        bottom: 0;
        color: black;

        p {
            color: inherit;
        }
    }
`

const Footer = () => {

    return (
        <StyledFooter id="footer">
            <img
                src={'images/honeycomb_footer.png'}
                alt='Honeycomb watercolor'
            />
            <section>
                <p>Phase 5 Project</p>
            </section>
        </StyledFooter>
    );
}

export default Footer;
