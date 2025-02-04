import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: black;

    div {
        width: 100%;
        display: flex;
        justify-content: end;
    }

    img {
        width: 70%;
    }
    
    section {
        position: absolute;
        bottom: 0;
        color: white;

        p {
            color: var(--honey);
        }
    }
`

const Footer = () => {

    return (
        <StyledFooter id="footer">
            <div>
                <img
                    src={'images/orange_hexagons.png'}
                    alt='Honeycomb watercolor'
                />
            </div>
            <section>
                <p>Phase 5 Project</p>
            </section>
        </StyledFooter>
    );
}

export default Footer;
