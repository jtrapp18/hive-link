import React from 'react';
import styled from 'styled-components';

const StyledIndex = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        width: 100%;
        justify-content: space-between;

        p {
            color: var(--bright-blue);
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

const InspectionIndex = ({ setStep }) => {

    const indices = [
        {section: 'Basic Information', page: 1},
        {section: 'Weather', page: 2},
        {section: 'Pests', page: 3},
        {section: 'Active Hive Management', page: 4},
        {section: 'Outcomes', page: 5},
        {section: 'Additional Notes', page: 5},
        {section: 'Submit', page: 5}
    ]

    return (
        <StyledIndex>
            <h3>Index</h3>
            {indices.map(index=>
                <div 
                    key={index.section} 
                    onClick={()=>setStep(index.page)}
                >
                    <p>{index.section}</p>
                    <p>{index.page}</p>
                </div>             
            )}
        </StyledIndex>
    );
}

export default InspectionIndex;
