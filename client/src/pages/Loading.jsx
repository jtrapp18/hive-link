import React from 'react';
import styled from 'styled-components';

const LoadingText = styled.p`
    font-size: clamp(1.4rem, 3.5vw, 2rem)
`

const Loading = () => {
    return (
        <main>
            <LoadingText>Loading</LoadingText>🐝🐝🐝
        </main>
    );
}

export default Loading;
