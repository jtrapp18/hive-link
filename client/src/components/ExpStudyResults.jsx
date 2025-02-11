import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getJSON, snakeToCamel, camelToProperCase, formattedTime } from '../helper';
import { ClipLoader } from 'react-spinners';

const FeaturesContainer = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;

    li, p {
        color: gray;
    }

    ol {
        width: 100%;
        column-count: 3;
        column-gap: space-between;  
    }

    small {
        font-style: italic;
    }
`

const ExpStudyResults = () => {
    const [studyInfo, setStudyInfo] = useState(null);

    // Fetching study results
    useEffect(() => {
        console.log('logging study results...')
        getJSON("exp_study")
          .then((data) => {
            const dataTransformed = snakeToCamel(data);
            setStudyInfo(dataTransformed);
          });
      }, []);

    if (!studyInfo) return <ClipLoader color='var(--bright-blue)'/>;

    const { runDate, testMetrics, testResults } = studyInfo;

    return (
        <FeaturesContainer>
            <p><strong>Top impacts on honey production </strong></p>
            <ol>
                {testResults.map(result=>
                    <li key={result.Feature}>{camelToProperCase(result.Feature)}</li>
                )}
            </ol>
            <p><small>Based on MLP Regressor user experience study run {formattedTime(runDate)}</small></p>
        </FeaturesContainer>
    );
}

export default ExpStudyResults;
