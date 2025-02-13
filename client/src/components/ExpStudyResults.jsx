import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getJSON, snakeToCamel, camelToProperCase, formattedTime } from '../helper';
import { ClipLoader } from 'react-spinners';

const FeaturesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;

    li, p {
        color: gray;
    }

    li {
        column-width: 200px;
        margin: 0% 1%;
    }

    ol {
        width: fit-content;
        column-count: 2;

        @media (min-width: 768px) {
            column-count: 3;
        }
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

    if (!studyInfo) return <FeaturesContainer><ClipLoader color='var(--bright-blue)'/></FeaturesContainer>;

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
