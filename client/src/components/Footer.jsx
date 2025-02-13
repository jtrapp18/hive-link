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
        align-items: end;
        justify-content: space-between;

        #bees {
            width: 20%;
            height: auto;
            object-fit: contain;
        }   

        #hexagons {
            width: 70%;
        }        
    }

    section {
        position: absolute;
        bottom: 0;
        left: 0;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        div {
            max-width: 60%;
            align-items: center;
            justify-content: center;
        }

        p {
            color: var(--honey);
            text-align: center;
            text-shadow: 1px 1px 2px black;
            margin: 0;
            padding: 0;
        }
    }

    #data-caveat {
        color: white;
    }
`

const Footer = () => {

    return (
        <StyledFooter id="footer">
            <div>
                <img
                    id='bees'
                    src='/images/three_bees.png'
                    alt='bees flying' 
                />
                <img
                    id='hexagons'
                    src={'images/orange_hexagons.png'}
                    alt='Honeycomb watercolor'
                />
            </div>
            <section>
                <div>
                    <p><small>This website was developed for the capstone project at FlatIron School</small></p>
                </div>
                <p id='data-caveat'><small>All data displayed is purely hypothetical and does not represent actual beekeeper data</small></p>
            </section>
        </StyledFooter>
    );
}

export default Footer;
