import React from 'react';
import styled from 'styled-components';

const LoadingText = styled.div`

    p {
        color: var(--yellow);
        font-size: clamp(1.4rem, 3.5vw, 2rem);

        strong {
            font-size: clamp(3rem, 6vw, 7rem);
        }
    }
`

const Loading = () => {
    return (
        <LoadingText>
            <p><strong>Loading</strong>🐝🐝🐝</p>
        </LoadingText>
    );
}

export default Loading;
