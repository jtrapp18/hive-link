import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        background: black;
        color: var(--honey);

        &.disabled {
            color: gray;
        }
    }
`

const FormFooter = ({step, prevStep, nextStep}) => {

    return (
        <StyledFooter id="footer">
            <button 
                type='button' 
                onClick={prevStep}
                disabled={step === 1}
            >
                Prev Page
            </button>
            <p>{`Page ${step} of 5`}</p>
            <button 
                type='button' 
                onClick={nextStep}
                disabled={step === 5}
            >
                Next Page
            </button>
        </StyledFooter>
    );
}

export default FormFooter;
