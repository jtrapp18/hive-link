import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    background: black;
    padding-top: 2%;
    box-shadow: 0px -4px 10px rgba(115, 108, 108, 0.5);

    .page-count {
        cursor: pointer;

        &:hover {
            color: var(--bright-blue);
            text-decoration: underline;
        }
    }

    button {
        background: black;
        color: var(--honey);

        &.disabled {
            color: gray;
        }
    }
`

const FormFooter = ({step, setStep, prevStep, nextStep}) => {

    return (
        <StyledFooter id="footer">
            <button 
                type='button' 
                onClick={prevStep}
                disabled={step === 1}
            >
                Prev Page
            </button>
            <p className='page-count' onClick={()=>setStep(0)}>{step===0 ? 'Index' : `Page ${step} of 5`}</p>
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
