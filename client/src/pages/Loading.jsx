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

    .bees {
        display: inline-block;
        font-size: clamp(1.4rem, 3.5vw, 2rem);
        white-space: nowrap;
    }

    .bee {
        display: inline-block;
        opacity: 0;
        animation: beeAnimation 1.5s forwards;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;  /* Repeat animation indefinitely */
    }

    /* Define the animation to make bees appear one after another */
    @keyframes beeAnimation {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    /* Delay the animation of each bee */
    .bee:nth-child(1) {
        animation-delay: 0.2s;
    }

    .bee:nth-child(2) {
        animation-delay: 0.4s;
    }

    .bee:nth-child(3) {
        animation-delay: 0.6s;
    }

    .bee:nth-child(4) {
        animation-delay: 0.8s;
    }
`;

const Loading = () => {
    return (
        <LoadingText>
            <p><strong>Loading</strong> 
                <span className="bees">
                    <span className="bee">🐝</span>
                    <span className="bee">🐝</span>
                    <span className="bee">🐝</span>
                </span>
            </p>
        </LoadingText>
    );
}

export default Loading;