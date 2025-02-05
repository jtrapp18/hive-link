import React from 'react';
import styled from 'styled-components';

const LoadingText = styled.div`
    h3 {
        font-size: clamp(1.4rem, 3.5vw, 2rem)

        strong {
            font-size: clamp(1.4rem, 3.5vw, 2rem)
        }
    }
`

const Loading = () => {
    return (
        <main>
            <LoadingText>
                <h3><strong>Loading🐝🐝🐝</strong></h3>
            </LoadingText>
        </main>
    );
}

export default Loading;
