import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
            <p>{`Page ${step} of 7`}</p>
            <button 
                type='button' 
                onClick={nextStep}
                disabled={step === 7}
            >
                Next Page
            </button>
        </StyledFooter>
    );
}

export default FormFooter;
