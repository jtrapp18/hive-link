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
        color: white;

        p {
            color: var(--honey);
            text-align: center;
        }
    }
`

// const Bees = styled.img`
//   position: absolute;
//   bottom: 0;
//   left: 5%;
//   width: 20vw;
// `

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
                <p>This website was developed for the capstone project at FlatIron School</p>
            </section>
        </StyledFooter>
    );
}

export default Footer;
